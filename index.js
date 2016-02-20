/*global require, module, process*/
var c = require('neocolor');

var counterTotal = 0,
    counterSuccess = 0,
    counterFailure = 0;
var indent = 0,
    testIndentChar = ' ',
    groupIndentChar = '➽',
    groupDecoration = '—';

function report(testName, testFn) {
  try {
    counterTotal += 1;
    var strIndent = testIndentChar.repeat(indent);
    process.stdout.write(strIndent + c.yellow(testName + ': '));
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

function testing(groupName, groupFn) {
  var strIndent = indent > 0 ?
        groupIndentChar.repeat(indent) + ' ' :
        '';
  var decoration = (indent > 0 ? ' '.repeat(indent + 1): '') +
        groupDecoration.repeat(groupName.length);
  console.log();
  console.log(strIndent + c.yellow(groupName));
  console.log(c.yellow(decoration));
  indent += 1;
  groupFn();
  indent -= 1;
}

function result() {
  console.log();
  console.log('Total : ' + counterTotal);
  console.log('Passed: ' + counterSuccess);
  console.log('Failed: ' + counterFailure);
}

// long names
module.exports.report = report;
module.exports.testing = testing;
module.exports.result = result;
// short names
module.exports.r = report;
module.exports.res = result;
