import assert from "assert"
import { spawnSync } from "child_process"
import { realpathSync } from "fs"
import { platform } from "os"

let currentDirectory = realpathSync(".").replace(/\\/g, "/")
if (platform() === "win32") {
  currentDirectory = "/" + currentDirectory
}

const command = spawnSync("node", ["test/test.js"])
// expect exit code to be number of failure
assert.equal(command.status, 2)
assert.ok(command.stdout)
assert.ok(command.stderr)
const stdout = command.stdout.toString()
const expectedStdout = `\u001b[37madd success: \u001b[39m\u001b[1m\u001b[32mOK\u001b[39m\u001b[22m
\u001b[37madd failure: \u001b[39m\u001b[1m\u001b[31mFAILED\u001b[39m\u001b[22m
| loc	__REPLACE_ME__/test/test.js:14:1
| error	\u001b[31m3 == 4\u001b[39m

\u001b[4m\u001b[37mone level nested tests\u001b[39m\u001b[24m
  \u001b[37mnested test: \u001b[39m\u001b[1m\u001b[32mOK\u001b[39m\u001b[22m

\u001b[4m\u001b[37mmultiple levels of nested tests\u001b[39m\u001b[24m

  \u001b[4m\u001b[37mfirst group level 1\u001b[39m\u001b[24m
    \u001b[37mnested test 1. 1: \u001b[39m\u001b[1m\u001b[32mOK\u001b[39m\u001b[22m
    \u001b[37mnested test 1. 2: \u001b[39m\u001b[1m\u001b[32mOK\u001b[39m\u001b[22m

  \u001b[4m\u001b[37msecond group level 1\u001b[39m\u001b[24m
    \u001b[37mnested test 2.1: \u001b[39m\u001b[1m\u001b[32mOK\u001b[39m\u001b[22m

   \u001b[4m\u001b[37mgroup level 2\u001b[39m\u001b[24m
      \u001b[37mnested test 2.2.1: \u001b[39m\u001b[1m\u001b[32mOK\u001b[39m\u001b[22m
      \u001b[37mnested test 2.2.2: \u001b[39m\u001b[1m\u001b[32mOK\u001b[39m\u001b[22m

\u001b[4m\u001b[37mtests defined in another module\u001b[39m\u001b[24m
  \u001b[37mtest recursive function exceeding call stack size: \u001b[39m\u001b[1m\u001b[31mFAILED\u001b[39m\u001b[22m
| loc	__REPLACE_ME__/test/test.js:59:2
| error	\u001b[31mMaximum call stack size exceeded\u001b[39m

Total:  9
Passed: 7
Failed: 2
`
assert.equal(stdout, expectedStdout.replace(/__REPLACE_ME__/g, `file://${currentDirectory}`))

const stderr = command.stderr.toString().replace(/^.+ExperimentalWarning: The ESM module loader is experimental.\n/, "") // ignore node warning
const expectedStderr = `\u001b[90mAssertionError [ERR_ASSERTION]: 3 == 4
    at __REPLACE_ME__/test/test.js:16:2
    at report (__REPLACE_ME__/index.js:17:3)
    at __REPLACE_ME__/test/test.js:14:1
    at ModuleJob.run (internal/modules/esm/module_job.js:110:37)
    at async Loader.import (internal/modules/esm/loader.js:176:24)\u001b[39m
\u001b[90mRangeError: Maximum call stack size exceeded
    at recurse (__REPLACE_ME__/test/module1.js:3:17)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)
    at recurse (__REPLACE_ME__/test/module1.js:4:2)\u001b[39m
`

assert.equal(stderr, expectedStderr.replace(/__REPLACE_ME__/g, `file://${currentDirectory}`))
