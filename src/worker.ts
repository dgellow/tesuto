import { parentPort, isMainThread } from "worker_threads"
import { stripWorkerContext, Message, ErrorMessage } from "./events.js"
import url from "url"
import { Testing } from "./testing.js"
import { workerLogger as logger } from "./logging.js"

if (isMainThread)
	throw new Error("worker logic should not be run in the main thread")

if (!parentPort)
	throw new Error("parentPort is undefined")

const pid = process.pid

async function runTestFile(filepath: string) {
	const mod = await import(url.pathToFileURL(filepath).toString())
	logger.log(pid, `module loaded`, mod)
	const testing = new Testing()

	for (let propName in mod) {
		const propVal = mod[propName]
		if (typeof propVal !== "function")
			continue

		logger.log(pid, `found test: ${propName} => ${propVal}`)
		try {
			await propVal(testing)
		}
		catch (e) {
			logger.error(pid, `test failed`, e)
			if (e === "stop") continue // stop signal
			testing.fail(e)
		}
	}

	logger.log(pid, `test result`, testing)
	return testing
}

parentPort.on("message", async (data: any) => {
	const context = stripWorkerContext(data)
	logger.log(pid, `worker context`, context)

	try {
		const result = await runTestFile(context.filepath)
		logger.log(pid, `done testing`, result)
		const message: Message = { type: "message", pid, testing: result }
		parentPort!.postMessage(message)
	} catch (e) {
		logger.error(pid, `failed`, e)
		const message: ErrorMessage = { type: "error", pid, error: e }
		parentPort!.postMessage(message)
	}
})


// const message1: Message = { pid: process.pid, hello: "world" }

// logger.log(pid, "worker pid:", process.pid)
// logger.log(pid, "worker data:", workerData)
// if (!parentPort)
// 	throw new Error("no parent port :(")
// parentPort?.postMessage(message1)

// const message2: Message = { pid: process.pid, hello: "second world" }

// parentPort?.postMessage(message2)

