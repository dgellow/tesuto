/*global require, process*/
var assert = require('assert'),
    t = require('./index');

function add (x, y) {
  return x + y;
}

t.report("add success", function() {
  assert.equal(add(1, 2), 3);
  assert.equal(add(2, 2), 4);
});

t.report("add failure", function () {
  assert.equal(add(1, 2), 3);
  assert.equal(add(1, 2), 4);
});

t.result();
