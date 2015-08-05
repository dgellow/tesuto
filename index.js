/*global require, module, process*/
var c = require('colors/safe');

var counterTotal = 0,
    counterSuccess = 0,
    counterFailure = 0;

module.exports.report = function report(testName, testFn) {
  try {
    counterTotal += 1;
    process.stdout.write(c.yellow(testName + ': '));
    testFn();
    console.info(c.green('OK'));
    counterSuccess += 1;
  } catch(e) {
    var match = e.stack.match(new RegExp(
      "at.+" + module.parent.filename + ":(\\d+):(\\d+)"
    ));
    var line = match[1],
        char = match[2];
    counterFailure += 1;
    console.error(c.red('FAILED') +' ' + c.blue(line + ':' + char));
    console.error(c.red(e.message));
    console.error(c.grey(e.stack));
  }
};

module.exports.result = function result() {
  console.log('Total: ' + counterTotal);
  console.log('Passed: ' + counterSuccess);
  console.log('Failed: ' + counterFailure);
};
