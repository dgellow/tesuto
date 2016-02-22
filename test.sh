ACTUAL_STDOUT=$(node test/test.js)
EXPECTED_STDOUT=$(/bin/echo -e \
"^[[33mlong and short name methods are the same object: ^[[39m^[[32mOK^[[39m
^[[33madd success: ^[[39m^[[32mOK^[[39m
^[[33madd failure: ^[[39m^[[31mFAILED^[[39m ^[[34m28:10^[[39m
^[[31m3 == 4^[[39m

^[[33mone level nested tests^[[39m
^[[33m——————————————————————^[[39m
 ^[[33mnested test: ^[[39m^[[32mOK^[[39m

^[[33mmultiple levels of nested tests^[[39m
^[[33m———————————————————————————————^[[39m

➽ ^[[33mfirst group level 1^[[39m
  ^[[33m———————————————————^[[39m
  ^[[33mnested test 1. 1: ^[[39m^[[32mOK^[[39m
  ^[[33mnested test 1. 2: ^[[39m^[[32mOK^[[39m

➽ ^[[33msecond group level 1^[[39m
  ^[[33m————————————————————^[[39m
  ^[[33mnested test 2.1: ^[[39m^[[32mOK^[[39m

➽➽ ^[[33mgroup level 3^[[39m
   ^[[33m—————————————^[[39m
   ^[[33mnested test 2.2.1: ^[[39m^[[32mOK^[[39m
   ^[[33mnested test 2.2.2: ^[[39m^[[32mOK^[[39m

Total : 9
Passed: 8
Failed: 1
")

echo "___________"
echo "echo --version"
echo $(/bin/echo --version)
echo "___________"

echo "___________"
echo "ACTUAL"
echo "___________"
echo "${ACTUAL_STDOUT}"

echo "___________"
echo "EXPECTED"
echo "___________"
echo "${EXPECTED_STDOUT}"

if [ "${ACTUAL_STDOUT}" = "${EXPECTED_STDOUT}" ]; then
    true
else
    false
fi
