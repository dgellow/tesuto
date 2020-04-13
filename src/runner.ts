import path from "path"
import url from "url"
import { Worker } from "worker_threads"
import os from "os"

import { WorkerContext } from "./events.js"
import { WorkerPool } from "./worker_pool.js"
import { Testing } from "./testing.js"
import { runnerLogger as logger } from "./logging.js"

const currentDir = path.dirname(url.fileURLToPath(import.meta.url))

let workerPool: WorkerPool<WorkerContext, Testing>

export async function run(filepaths: string[]) {
	logger.log("run")
	if (!workerPool) {
		const nbCPUs = os.cpus().length
		const nbWorkers = filepaths.length < nbCPUs ? filepaths.length : nbCPUs
		logger.log(`initialize worker pool with ${nbWorkers} workers`)
		workerPool = new WorkerPool(path.join(currentDir, "./worker.js"), nbWorkers)
	}

	return Promise.all(filepaths.map(async (filepath, i) => {
		logger.log(i, `filepath`)
		logger.log(i, `schedule worker`)
		const result = await workerPool.run(() => ({ filepath }))
		logger.log(i, `worker done`, result)
	})).then(async () => {
		logger.log("all workers done")
		logger.log("stop worker pool")
		await workerPool.stop()
		logger.log("worker pool stopped")
	})

	// filepaths.forEach(async (filepath, i) => {
	// 	logger.log(`filepath`, filepath)

	// 	logger.log(`create worker`)
	// 	const worker = new Worker(path.join(currentDir, "./worker.js"), {
	// 		// stderr: false,
	// 		// stdout: false,
	// 		workerData: { filepath },
	// 	})
	// 	logger.log(`worker created`)

	// 	while (true) {
	// 		const [data, event] = await promisify(worker)
	// 		logger.log(`worker data`, data)
	// 		logger.log(`worker event`, event)
	// 		if (event === WorkerEvent.exit)
	// 			return
	// 	}
	// })

	// for (const filepath of filepaths) {
	// 	logger.log("filepath", filepath)

	// 	logger.log("create worker")
	// 	const worker = new Worker(path.join(currentDir, "./worker.js"), { workerData: { filepath } })
	// 	logger.log("worker created")

	// 	while (true) {
	// 		const [data, event] = await promisify(worker)
	// 		logger.log("worker data", data)
	// 		logger.log("worker event", event)
	// 		if (event === WorkerEvent.exit)
	// 			return
	// 	}

	// 	// const filepath = filepaths[i]
	// 	// const ext = path.extname(filepath)
	// 	// if (ext === "ts") {
	// 	// 	filepaths[i] = compile(filepath)
	// 	// }
	// 	// else if (ext === "tsx") {
	// 	// 	filepaths[i] = compileTSX(filepath)
	// 	// }
	// 	// else if (ext === "jsx") {
	// 	// 	filepaths[i] = compileJSX(filepath)
	// 	// }
	// 	// else {
	// 	// 	filepaths[i] = filepath
	// 	// }
	// }
}
