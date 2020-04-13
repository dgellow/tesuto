import { equal } from 'assert'
import module1 from "./module1.js"
import { Testing } from "../../src/testing.js"

function add(x: number, y: number) {
	return x + y
}

export function addSuccess(t: Testing) {
	equal(add(1, 2), 3)
	equal(add(2, 2), 4)
}

export function addFailure(t: Testing) {
	equal(add(1, 2), 3)
	equal(add(1, 2), 4)
}

export function oneLevelNestedTests(t: Testing) {
	t.test("nested test", () => {
		equal(add(1, 2), 3)
		equal(add(2, 2), 4)
	})
}

export function multipleLevelsOfNestedTests(t: Testing) {
	t.group("first group level 1", () => {
		t.test("nested test 1. 1", () => {
			equal(add(1, 2), 3)
			equal(add(2, 2), 4)
		})

		t.test("nested test 1. 2", () => {
			equal(add(1, 2), 3)
			equal(add(2, 2), 4)
		})
	})

	t.group("second group level 1", function () {
		t.test("nested test 2.1", function () {
			equal(add(1, 2), 3)
			equal(add(2, 2), 4)
		})

		t.group("group level 2", function () {
			t.test("nested test 2.2.1", function () {
				equal(add(1, 2), 3)
				equal(add(2, 2), 4)
			})
			t.test("nested test 2.2.2", function () {
				equal(add(1, 2), 3)
				equal(add(2, 2), 4)
			})
		})
	})
}

export function testsDefinedInAnotherModule(t: Testing) {
	t.test("test recursive function exceeding call stack size", () => {
		module1()
	})
}

export function testsThrowingValues(t: Testing) {
	t.test("throwing Error value", () => {
		throw new Error("a test error")
	})
	t.test("throwing a string", () => {
		throw "a string value used as error"
	})
	t.test("throwing a number", () => {
		throw 1234
	})
}
