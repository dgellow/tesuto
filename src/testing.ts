export class Testing {
	countSuccess = 0
	countFailure = 0
	errs: Error[] = []
	get failed() {
		return this.countFailure !== 0
	}

	success() {
		this.countSuccess += 1
	}
	fail(err?: Error) {
		this.countFailure += 1
		if (err) {
			this.errs.push(err)
		}
	}
	stop() {
		throw "stop"
	}
	test(name: string, testFn: () => void) {
		testFn()
	}
	group(name: string, groupFn: () => void) {
		groupFn()
	}
}
