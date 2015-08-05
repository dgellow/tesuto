ACTUAL_STDOUT=$(node test.js)
EXPECTED_STDOUT=$(/bin/echo -e "\e[33madd success: \e[39m\e[32mOK\e[39m
\e[33madd failure: \e[39m\e[31mFAILED\e[39m \e[34m16:10\e[39m
\e[31m3 == 4\e[39m
Total: 2
Passed: 1
Failed: 1")

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
