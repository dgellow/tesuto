/*global require, process*/
var assert = require('assert'),
    t = require('./index');

assert.equal(typeof t.report, 'function');
assert.equal(typeof t.result, 'function');
assert.equal(typeof t.testing, 'function');

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

t.testing("one level nested tests", function() {
  t.report("nested test", function () {
    assert.equal(add(1, 2), 3);
    assert.equal(add(2, 2), 4);
  });
});

t.testing("multiple levels of nested tests", function () {
  t.testing("first group level 1", function() {
    t.report("nested test 1. 1", function () {
      assert.equal(add(1, 2), 3);
      assert.equal(add(2, 2), 4);
    });

    t.report("nested test 1. 2", function () {
      assert.equal(add(1, 2), 3);
      assert.equal(add(2, 2), 4);
    });
  });

  t.testing("second group level 1", function() {
    t.report("nested test 2.1", function () {
      assert.equal(add(1, 2), 3);
      assert.equal(add(2, 2), 4);
    });

    t.testing("group level 3", function() {
      t.report("nested test 2.2.1", function () {
        assert.equal(add(1, 2), 3);
        assert.equal(add(2, 2), 4);
      });
      t.report("nested test 2.2.2", function () {
        assert.equal(add(1, 2), 3);
        assert.equal(add(2, 2), 4);
      });
    });
  });
});

t.result();
