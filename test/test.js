import { equal } from 'assert'
import { report, result, testing } from '../index.js'
import module1 from "./module1.js"

equal(typeof report, 'function')
equal(typeof result, 'function')
equal(typeof testing, 'function')

function add(x, y) {
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

result()
