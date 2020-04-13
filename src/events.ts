import { Worker } from "worker_threads"
import { Testing } from "./testing"

export interface Message {
	type: "message"
	pid: number
	testing: Testing
}

export interface ErrorMessage {
	type: "error"
	pid: number
	error: any
}

export interface WorkerContext {
	filepath: string
}

export function isWorkerContext(context: any): context is WorkerContext {
	return !!context.filepath
}

export function stripWorkerContext(arg: any): WorkerContext {
	if (!isWorkerContext(arg)) throw new Error(`invalid WorkerContext: ${JSON.stringify(arg)}`)
	const { filepath } = arg
	return { filepath }
}

export const enum WorkerEvent {
	message = "message",
	online = "online",
	exit = "exit",
	error = "error",
}

type IOnResolveArgs<T, E> = [T, E, Worker]
type IOnMessage = IOnResolveArgs<Message, WorkerEvent.message>
type IOnOnline = IOnResolveArgs<any[], WorkerEvent.online>
type IOnExit = IOnResolveArgs<number, WorkerEvent.exit>
type IReject = (args: string | Error | undefined) => void

export function promisify(worker: Worker): Promise<IOnMessage | IOnOnline | IOnExit> {
	return new Promise((resolve, reject: IReject) => {
		worker.on(WorkerEvent.message, data => resolve([data, WorkerEvent.message, worker]))
		// worker.on(WorkerEvent.online, (args: any) => resolve([args, WorkerEvent.online, worker]))
		worker.on(WorkerEvent.exit, code => {
			if (code !== 0) reject(new Error(`worker stopped with exit code ${code}`))
			else resolve([code, WorkerEvent.exit, worker])
		})
		worker.on(WorkerEvent.error, reject)
	})
}
