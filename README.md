node-em
=======

The `em` extends few core [NodeJS](http://nodejs.org/) modules with 
simpler object oriented interface and immutable objects.

Installation
------------

It can be installed directly from NPM:

	npm install em

License
-------

Open source, MIT-style license.

Examples
--------

The code `em.URL.parse('http://www.jhh.me/foo/bar').hostname` will result as `www.jhh.me`.

At the moment for further details please take a look at [tests](https://github.com/jheusala/node-em/tree/master/tests/vows).

URL
---

`em.URL(url)` is a smart object constructor using Node's core [url 
module](http://nodejs.org/api/url.html). Created `URL` objects are 
immutable -- instances cannot be changed after their creation.

Reference
---------

## require('em').URL

### `new URL(value, opts, flags)`

### `URL.create(value, opts, flags)`

### `URL.prototype.toString()`

### `URL.prototype.toJSON()`

### `URL.prototype.resolve(to)`

### `URL.prototype.parse()`

### `URL.parse(url)`

### `URL.format(url)`

## require('em').Path

### `new Path(value)`

### `Path.create(value)`

### `Path.prototype.toString()`

### `Path.prototype.toJSON()`

### `Path.prototype.resolve(...)`

### `Path.prototype.relative(to)`

### `Path.prototype.dirname()`

### `Path.prototype.basename()`

### `Path.prototype.extname()`

### `Path.prototype.join(...)`

### `Path.join(...)`

