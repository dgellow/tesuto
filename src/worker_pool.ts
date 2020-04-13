import { Worker } from "worker_threads"
import { poolLogger as logger } from "./logging.js"

export class WorkerPool<WorkerData, Result> {
	private queue: QueueItem<WorkerData, Result>[] = []
	private workersByID: { [key: number]: Worker } = {}
	private activeWorkersByID: { [key: number]: boolean } = {}

	constructor(
		public workerPath: string,
		public numberOfThreads: number,
	) {
		if (this.numberOfThreads < 1)
			return

		for (let i = 0; i < this.numberOfThreads; i++) {
			const worker = new Worker(this.workerPath)
			this.workersByID[i] = worker
			this.activeWorkersByID[i] = false
		}
	}

	run(getData: () => WorkerData) {
		return new Promise<Result>((resolve, reject) => {
			const availableWorkerID = this.getInactiveWorkerID()
			const queueItem: QueueItem<WorkerData, Result> = {
				getData,
				callback: (error, result) => error ? reject(error) : resolve(result)
			}
			if (availableWorkerID === -1) {
				this.queue.push(queueItem)
				return null
			}
			this.runWorker(availableWorkerID, queueItem)
		})
	}

	stop() {
		const entries = <O>(o: O) => Object.entries(o) as ([keyof O, Worker])[]
		return Promise.all(entries(this.workersByID).map(([id, worker]) => {
			this.cleanUp(id)
			return worker.terminate()
		}))
	}

	private getInactiveWorkerID(): number {
		for (let i = 0; i < this.numberOfThreads; i++)
			if (!this.activeWorkersByID[i]) return i
		return -1
	}

	private runWorker(workerID: number, queueItem: QueueItem<WorkerData, Result>) {
		const worker = this.workersByID[workerID]
		this.activeWorkersByID[workerID] = true

		const messageCallback = (result: Result) => {
			logger.log(workerID, `message callback`)
			queueItem.callback(null, result)
			this.cleanUp(workerID)
			processNext()
		}

		const errorCallback = (error: any) => {
			logger.log(workerID, `error callback`)
			queueItem.callback(error)
			this.cleanUp(workerID)
			processNext()
		}

		const processNext = () => {
			const nextItem = this.queue.shift()
			if (nextItem) {
				logger.log(workerID, "process next item", nextItem)
				this.runWorker(workerID, nextItem)
			} else {
				logger.log(workerID, "no next item")
			}
		}

		worker.once("message", messageCallback)
		worker.once("error", errorCallback)

		const message = queueItem.getData()
		logger.log(workerID, "post message to worker", message)
		worker.postMessage(message)
	}

	private cleanUp(workerID: number) {
		logger.log(workerID, `cleanup`)
		const worker = this.workersByID[workerID]
		worker.removeAllListeners("message")
		worker.removeAllListeners("error")
		this.activeWorkersByID[workerID] = false
	}
}

type QueueCallback<Result> = (err: any, result?: Result) => void
interface QueueItem<WorkerData, Result> {
	callback: QueueCallback<Result>
	getData: () => WorkerData
}
