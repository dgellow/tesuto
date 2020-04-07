import { equal } from 'assert'
import { report, result, testing } from '../index.js'
import module1 from "./module1.js"

function add(x: number, y: number) {
	return x + y
}

report("add success", function () {
	equal(add(1, 2), 3)
	equal(add(2, 2), 4)
})

report("add failure", function () {
	equal(add(1, 2), 3)
	equal(add(1, 2), 4)
})

testing("one level nested tests", function () {
	report("nested test", function () {
		equal(add(1, 2), 3)
		equal(add(2, 2), 4)
	})
})

testing("multiple levels of nested tests", function () {
	testing("first group level 1", function () {
		report("nested test 1. 1", function () {
			equal(add(1, 2), 3)
			equal(add(2, 2), 4)
		})

		report("nested test 1. 2", function () {
			equal(add(1, 2), 3)
			equal(add(2, 2), 4)
		})
	})

	testing("second group level 1", function () {
		report("nested test 2.1", function () {
			equal(add(1, 2), 3)
			equal(add(2, 2), 4)
		})

		testing("group level 2", function () {
			report("nested test 2.2.1", function () {
				equal(add(1, 2), 3)
				equal(add(2, 2), 4)
			})
			report("nested test 2.2.2", function () {
				equal(add(1, 2), 3)
				equal(add(2, 2), 4)
			})
		})
	})
})

testing("tests defined in another module", function () {
	report("test recursive function exceeding call stack size", function () {
		module1()
	})
})

testing("tests throwing values", function () {
	report("throwing Error value", () => {
		throw new Error("a test error")
	})
	report("throwing a string", () => {
		throw "a string value used as error"
	})
	report("throwing a number", () => {
		throw 1234
	})
})

process.exit(result())