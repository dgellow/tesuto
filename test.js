/*global require, process*/
var assert = require('assert'),
    t = require('./index');

assert.equal(typeof t.report, 'function');
assert.equal(typeof t.result, 'function');

t.report("long and short name methods are the same object", function() {
  assert.equal(typeof t.r, 'function');
  assert.equal(t.report, t.r);

  assert.equal(typeof t.res, 'function');
  assert.equal(t.result, t.res);
});

function add (x, y) {
  return x + y;
}

t.report("add success", function () {
  assert.equal(add(1, 2), 3);
  assert.equal(add(2, 2), 4);
});

t.report("add failure", function () {
  assert.equal(add(1, 2), 3);
  assert.equal(add(1, 2), 4);
});

t.result();
