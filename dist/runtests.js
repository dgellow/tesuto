import assert from "assert";
import { green, grey, red } from "neocolor";
import { spawnSync } from "child_process";
import path from "path";
import url from "url";
import diff from "diff";
import { exit } from "process";
const currentDirectory = path.dirname(import.meta.url);
const testScript = path.join(url.fileURLToPath(currentDirectory), "test", "test.js");
const command = spawnSync("node", [testScript]);
// expect exit code to be number of failure
assert.equal(command.status, 5);
assert.ok(command.stdout);
assert.ok(command.stderr);
function compare(left, right) {
    try {
        assert.equal(left, right);
    }
    catch (e) {
        console.log();
        console.error("stderr assert failed:");
        const d = diff.diffLines(left, right);
        d.forEach(part => {
            const color = part.added ? green :
                part.removed ? red : grey;
            process.stderr.write(color(part.value));
        });
        console.log();
        console.log();
        exit(1);
    }
}
const stdout = command.stdout.toString();
const expectedStdout = `\u001b[37madd success: \u001b[39m\u001b[1m\u001b[32mOK\u001b[39m\u001b[22m
\u001b[37madd failure: \u001b[39m\u001b[1m\u001b[31mFAILED\u001b[39m\u001b[22m
| loc	__REPLACE_ME__/test/test.js:11:1
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
| loc	__REPLACE_ME__/test/test.js:50:5
| error	\u001b[31mMaximum call stack size exceeded\u001b[39m

\u001b[4m\u001b[37mtests throwing values\u001b[39m\u001b[24m
  \u001b[37mthrowing Error value: \u001b[39m\u001b[1m\u001b[31mFAILED\u001b[39m\u001b[22m
| loc	__REPLACE_ME__/test/test.js:55:5
| error	\u001b[31ma test error\u001b[39m
  \u001b[37mthrowing a string: \u001b[39m\u001b[1m\u001b[31mFAILED\u001b[39m\u001b[22m
| loc	__REPLACE_ME__/test/test.js:58:5
| error	\u001b[31ma string value used as error\u001b[39m
  \u001b[37mthrowing a number: \u001b[39m\u001b[1m\u001b[31mFAILED\u001b[39m\u001b[22m
| loc	__REPLACE_ME__/test/test.js:61:5
| error	\u001b[31m1234\u001b[39m

Total:  12
Passed: 7
Failed: 5
`;
compare(stdout, expectedStdout.replace(/__REPLACE_ME__/g, currentDirectory));
const stderr = command.stderr.toString().replace(/^.+ExperimentalWarning: The ESM module loader is experimental.\n/, ""); // ignore node warning
const expectedStderr = `\u001b[90mAssertionError [ERR_ASSERTION]: 3 == 4
    at __REPLACE_ME__/test/test.js:13:5
    at report (__REPLACE_ME__/index.js:14:9)
    at __REPLACE_ME__/test/test.js:11:1
    at ModuleJob.run (internal/modules/esm/module_job.js:110:37)
    at async Loader.import (internal/modules/esm/loader.js:176:24)\u001b[39m
\u001b[90mRangeError: Maximum call stack size exceeded
    at recurse (__REPLACE_ME__/test/module1.js:2:17)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)
    at recurse (__REPLACE_ME__/test/module1.js:3:5)\u001b[39m
\u001b[90mError: a test error
    at __REPLACE_ME__/test/test.js:56:15
    at report (__REPLACE_ME__/index.js:14:9)
    at __REPLACE_ME__/test/test.js:55:5
    at testing (__REPLACE_ME__/index.js:47:5)
    at __REPLACE_ME__/test/test.js:54:1
    at ModuleJob.run (internal/modules/esm/module_job.js:110:37)
    at async Loader.import (internal/modules/esm/loader.js:176:24)\u001b[39m
\u001b[90mError: a string value used as error
    at report (__REPLACE_ME__/index.js:20:17)
    at __REPLACE_ME__/test/test.js:58:5
    at testing (__REPLACE_ME__/index.js:47:5)
    at __REPLACE_ME__/test/test.js:54:1
    at ModuleJob.run (internal/modules/esm/module_job.js:110:37)
    at async Loader.import (internal/modules/esm/loader.js:176:24)\u001b[39m
\u001b[90mError: 1234
    at report (__REPLACE_ME__/index.js:20:17)
    at __REPLACE_ME__/test/test.js:61:5
    at testing (__REPLACE_ME__/index.js:47:5)
    at __REPLACE_ME__/test/test.js:54:1
    at ModuleJob.run (internal/modules/esm/module_job.js:110:37)
    at async Loader.import (internal/modules/esm/loader.js:176:24)\u001b[39m
`;
compare(stderr, expectedStderr.replace(/__REPLACE_ME__/g, currentDirectory));
