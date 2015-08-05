[![Build Status](https://travis-ci.org/dgellow/tesuto.svg)](https://travis-ci.org/dgellow/tesuto)

![tesuto logo](http://i.imgur.com/orh29FB.png)

# tesuto

A really tiny test reporting library, only 829 bytes.
The only dependency is [marak/colors.js](https://github.com/marak/colors.js/).

## Usage

```js
var assert = require('assert'),
    t = require('tesuto');

function add (x, y) {
  return x + y;
}

t.report("add function", function () {
  assert.equal(add(1, 2), 3);
  assert.equal(add(1, 2), 4);
});

t.result();
```

## Output example

![tesuto example](http://i.imgur.com/tmYZJZn.png)
