/*global require, module, process*/
var c = require('neocolor');

var counterTotal = 0,
    counterSuccess = 0,
    counterFailure = 0;

function report(testName, testFn) {
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
    console.log(c.red('FAILED') +' ' + c.blue(line + ':' + char));
    console.log(c.red(e.message));
    console.error(c.grey(e.stack));
  }
}

function result() {
  console.log('Total: ' + counterTotal);
  console.log('Passed: ' + counterSuccess);
  console.log('Failed: ' + counterFailure);
}

// long names
module.exports.report = report;
module.exports.result = result;
// short names
module.exports.r = report;
module.exports.res = result;
