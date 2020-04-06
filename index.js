import { green, red, grey, white, bold, underline } from "neocolor"
import process from "process"

let counterTotal = 0
let counterSuccess = 0
let counterFailure = 0

let indent = 0
const testIndentChar = "  "
const groupIndentChar = " "

export function report(testName, testFn) {
	try {
		counterTotal += 1
		const strIndent = testIndentChar.repeat(indent)
		process.stdout.write(strIndent + white(testName + ": "))
		testFn()
		console.log(bold(green("OK")))
		counterSuccess += 1
	} catch (e) {
		const stackLines = (new Error()).stack.split("\n")
		let match = null
		for (const i in stackLines) {
			const stackLine = stackLines[i]
			if (stackLine.match(new RegExp(`at (.+) \\(.+\\)$`)))
				continue
			match = stackLine.match(new RegExp(`at (.+):(\\d+):(\\d+)`))
			if (match) break
		}

		console.log(bold(red("FAILED")))
		if (match) {
			const [_, filename, line, char] = match
			console.log(`| loc\t${`${filename}:${line}:${char}`}`)
		}
		console.log(`| error\t${red(e.message)}`)
		console.error(grey(e.stack))
		counterFailure += 1
	}
}

export function testing(groupName, groupFn) {
	const strIndent = indent > 0 ? groupIndentChar.repeat(indent) + " " : ""
	console.log()
	console.log(strIndent + underline(white(groupName)))
	indent += 1
	groupFn()
	indent -= 1
}

export function result() {
	console.log()
	console.log("Total:  " + counterTotal)
	console.log("Passed: " + counterSuccess)
	console.log("Failed: " + counterFailure)
	return counterFailure
}

export default {
	report,
	testing,
	result,
}
