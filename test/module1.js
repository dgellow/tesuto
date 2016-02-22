/*global require, module*/
var assert = require('assert');

function recurse() {
  recurse();
}

module.exports.testModule = function() {
  assert.equal(recurse(), "will fail");
};
