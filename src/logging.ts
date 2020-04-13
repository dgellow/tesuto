import { bgBlue, bgMagenta, bgYellow, bgWhite } from "neocolor"

const enum From {
	workerPool = "pool",
	worker = "worker",
	runner = "runner",
	cli = "cli",
}

class Logger {
	constructor(
		private from: From,
		private colorFn?: (str: string) => string,
	) { }

	private writeLog(logFn: (message?: any, ...optionalParams: any[]) => void, ...args: any[]) {
		let label = ""
		let message = ""
		if (args.length >= 2 && typeof args[0] === "number" && typeof args[1] === "string") {
			label = ` ${args.shift()}`
			message = `: ${args.shift()}`
		}
		else if (args.length >= 1 && typeof args[0] === "string") {
			message = `: ${args.shift()}`
		}

		const header = this.colorFn ? this.colorFn("  ") : "  "
		console.log(`${header}[${this.from}${label}]${message}`, ...args)
	}

	log(identifier: number, message: string, ...rest: any[]): void
	log(message: string, ...rest: any[]): void
	log(...args: any[]): void {
		this.writeLog(console.log, ...args)
	}

	error(identifier: number, message: string, ...rest: any[]): void
	error(message: string, ...rest: any[]): void
	error(...args: any[]): void {
		this.writeLog(console.error, ...args)
	}
}

export const poolLogger = new Logger(From.workerPool, bgBlue)
export const workerLogger = new Logger(From.worker, bgMagenta)
export const runnerLogger = new Logger(From.runner, bgYellow)
export const cliLogger = new Logger(From.cli, bgWhite)
