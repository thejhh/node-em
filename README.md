node-em
=======

The `em` extends few core [NodeJS](http://nodejs.org/) modules with 
simpler object oriented interface and immutable objects.

* `em.URL` extends Node's core [url module](http://nodejs.org/api/url.html)
* `em.Path` extends Node's core [path module](http://nodejs.org/api/path.html)

Installation
------------

It can be installed directly from NPM:

	npm install em

License
-------

Open source, MIT-style license.

Examples
--------

### URL

You can create URL instances by calling `URL.create(path)` or `new 
URL(path)`. However `URL.create()` is smarter and will only create new 
objects when it must. For example when called with another URL object 
it will return it directly since URL objects are immutable and cannot 
be changed.

Each URL method returns an URL object, so you can chain its 
methods:

```javascript
var url = URL.create('http://www.jhh.me/')
    .resolve('/2012/12/24/setting-up-http-server-on-windows-with-node-js/')
    .parse();
console.log(url.href);
```

### Path

The `Path` works the same way. 

You can create objects by calling `Path.create('/foo/bar')`.

```javascript
var path = Path.create('/foo').join('bar/docroot').join('index.html');
console.log(path.basename('.html')); // Returns 'index'
```

### Further examples

At the moment for further details please take a look at [tests](https://github.com/jheusala/node-em/tree/master/tests/vows).

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

### `Path.prototype.basename(ext)`

### `Path.prototype.extname()`

### `Path.prototype.join(...)`

### `Path.join(...)`

