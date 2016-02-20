[![Build Status](https://travis-ci.org/dgellow/tesuto.svg)](https://travis-ci.org/dgellow/tesuto) [![npm version](https://badge.fury.io/js/tesuto.svg)](https://badge.fury.io/js/tesuto)

![tesuto logo](http://i.imgur.com/orh29FB.png)

# tesuto

A really tiny test reporting library.
The only dependency is [dgellow/neocolor](https://github.com/dgellow/neocolor/), a really simple module for colored console output.

## Usage

```js
var assert = require('assert'),
    t = require('tesuto');

function add (x, y) {
  return x + y;
}

# Report a test
t.report("add numbers", function () {
  assert.equal(add(1, 2), 3);
  assert.equal(add(2, 2), 4);
});

# Define a group of tests
t.testing("add function", function () {
  t.report("when first arg is a string, concatenate", function () {
    assert.equal(add("hello_", "you"), "hello_you");
    assert.equal(add("hello_", 2), "hello_2");
  });

  # Groups can be nested
  t.testing("with numbers", function() {
    t.report("should be associative", function () {
      assert.equal(add(1, 2), 3);
      assert.equal(add(2, 1), 3);
    });

    t.report("should support negative numbers", function () {
      assert.equal(add(-1, -2), -3);
      assert.equal(add(1, -2), -1);
    });
  });
});

t.result();
```

## Output example

![tesuto example](http://i.imgur.com/aOb285A.png?1)

## API
### `report` (alias: `r`), define a test

```
t.report("add numbers", function () {
  assert.equal(add(1, 2), 3);
  assert.equal(add(2, 2), 4);
});
```

### `testing`, define a group of tests

> Note: Groups can be nested

```
t.testing("add function", function () {
  t.report("when first arg is a string, concatenate", function () {
    assert.equal(add("hello_", "you"), "hello_you");
    assert.equal(add("hello_", 2), "hello_2");
  });
});
```

### `result` (alias: `res`), print statistics

```
t.result();
```
