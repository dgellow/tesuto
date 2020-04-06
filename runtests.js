import assert from 'assert'
import { execSync } from 'child_process'

var output = execSync('node test/test.js').toString()

const expected = `\u001b[33madd success: \u001b[39m\u001b[32mOK\u001b[39m
\u001b[33madd failure: \u001b[39m\u001b[31mFAILED\u001b[39m \u001b[34m28:10\u001b[39m
\u001b[31m3 == 4\u001b[39m

\u001b[33mone level nested tests\u001b[39m
\u001b[33m——————————————————————\u001b[39m
 \u001b[33mnested test: \u001b[39m\u001b[32mOK\u001b[39m

\u001b[33mmultiple levels of nested tests\u001b[39m
\u001b[33m———————————————————————————————\u001b[39m

➽ \u001b[33mfirst group level 1\u001b[39m
\u001b[33m  ———————————————————\u001b[39m
  \u001b[33mnested test 1. 1: \u001b[39m\u001b[32mOK\u001b[39m
  \u001b[33mnested test 1. 2: \u001b[39m\u001b[32mOK\u001b[39m

➽ \u001b[33msecond group level 1\u001b[39m
\u001b[33m  ————————————————————\u001b[39m
  \u001b[33mnested test 2.1: \u001b[39m\u001b[32mOK\u001b[39m

➽➽ \u001b[33mgroup level 3\u001b[39m
\u001b[33m   —————————————\u001b[39m
   \u001b[33mnested test 2.2.1: \u001b[39m\u001b[32mOK\u001b[39m
   \u001b[33mnested test 2.2.2: \u001b[39m\u001b[32mOK\u001b[39m

\u001b[33mtests defined in another module\u001b[39m
\u001b[33m———————————————————————————————\u001b[39m
 \u001b[33mtest recursive function exceeding call stack size: \u001b[39m\u001b[31mFAILED\u001b[39m \u001b[34m\u001b[39m
\u001b[31mMaximum call stack size exceeded\u001b[39m

Total : 9
Passed: 7
Failed: 2
`

assert.equal(output, expected)