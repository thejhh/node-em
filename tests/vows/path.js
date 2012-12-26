"use strict";

var vows = require('vows');
var assert = require('assert');
var Path = require('../../src/Path.js');

/* */
vows.describe('Testing Path').addBatch({
	"Path": {
		topic: function() { return Path; },
		'is function': function(o) { assert.isFunction(o); },
		'has .create()': function(o) { assert.isFunction(o.create); },
		'has .join()': function(o) { assert.isFunction(o.join); },
		'has .prototype.toString()': function(o) { assert.isFunction(o.prototype.toString); },
		'has .prototype.toJSON()': function(o) { assert.isFunction(o.prototype.toJSON); },
		'has .prototype.join()': function(o) { assert.isFunction(o.prototype.join); },
    },
	"Testing Path constuctor": {
		"new Path() throws TypeError": function() { assert.throws(function () { new Path(); }, TypeError); },
		"new Path([]) throws TypeError": function() { assert.throws(function () { new Path([]); }, TypeError); },
		"new Path({}) throws TypeError": function() { assert.throws(function () { new Path({}); }, TypeError); },
		"new Path(1234) throws TypeError": function() { assert.throws(function () { new Path(1234); }, TypeError); },
		"new Path(null) throws TypeError": function() { assert.throws(function () { new Path(null); }, TypeError); },
		"new Path(true) throws TypeError": function() { assert.throws(function () { new Path(true); }, TypeError); },
		"new Path('/hello/world') does not throw Error": function() { assert.doesNotThrow(function () { new Path('/hello/world'); }, Error); },
		"Path(Path('/hello/world')) does not throw Error": function() { assert.doesNotThrow(function () { Path(Path('/hello/world')); }, Error); },
		"Path(new Path('/hello/world')) does not throw Error": function() { assert.doesNotThrow(function () { Path(new Path('/hello/world')); }, Error); },
		"new Path(Path('/hello/world')) does not throw Error": function() { assert.doesNotThrow(function () { new Path(Path('/hello/world')); }, Error); },
		"new Path(new Path('/hello/world')) does not throw Error": function() { assert.doesNotThrow(function () { new Path(new Path('/hello/world')); }, Error); },
		"Path('/hello/').value equals '/hello'": function() { assert.equal(Path('/hello/').value, '/hello'); },
		"Path('/hello//world/').value equals '/hello/world'": function() { assert.equal(Path('/hello//world/').value, '/hello/world'); },
		"Path('/hello//world//').value equals '/hello/world'": function() { assert.equal(Path('/hello//world//').value, '/hello/world'); },
		"Path('/hello///world//').value equals '/hello/world'": function() { assert.equal(Path('/hello///world//').value, '/hello/world'); },
		"Path('/').value equals '/'": function() { assert.equal(Path('/').value, '/'); },
		"Path('foo.html').value equals 'foo.html'": function() { assert.equal(Path('foo.html').value, 'foo.html'); },
		"Path('..').value equals '..'": function() { assert.equal(Path('..').value, '..'); },
		"Path('/foo/..').value equals '/'": function() { assert.equal(Path('/foo/..').value, '/'); },
		"Path('/..').value equals '/'": function() { assert.equal(Path('/..').value, '/'); },
		"Path('/../..').value equals '/'": function() { assert.equal(Path('/../..').value, '/'); },
	},
	"new Path('/hello/world')": {
		topic: function() { return new Path('/hello/world'); },
		'is instance of Path': function(o) { assert.instanceOf(o, Path); },
		'is immutable': function(o) { assert.throws(function () { o.foo = '/foo/bar'; assert.equal(o.foo, undefined);  }, TypeError); },
		'.value equals "/hello/world"': function(o) { assert.equal(o.value, '/hello/world'); },
		'.value is immutable': function(o) { assert.throws(function () { o.value = '/foo/bar'; assert.equal(o.value, '/hello/world');  }, TypeError); },
		'.toJSON() works': function(o) { assert.equal(o.toJSON(), '/hello/world'); },
		'.toJSON() is immutable': function(o) { var foo = o.toJSON(); foo = '/foo/bar'; assert.equal(foo, '/foo/bar'); assert.equal(o.value, '/hello/world'); },
		'.toString() works': function(o) { assert.equal(o.toString(), '/hello/world'); },
		'.toString() is immutable': function(o) { var foo = o.toString(); foo = '/foo/bar'; assert.equal(foo, '/foo/bar'); assert.equal(o.value, '/hello/world'); },
	},
	"Path(new Path('/hello/world'))": {
		topic: function() { return Path(new Path('/hello/world')); },
		'is instance of Path': function(o) { assert.instanceOf(o, Path); },
		'.value equals "/hello/world"': function(o) { assert.equal(o.value, '/hello/world'); },
	},
	"new Path(new Path('/hello/world'))": {
		topic: function() { return new Path(new Path('/hello/world')); },
		'is instance of Path': function(o) { assert.instanceOf(o, Path); },
		'.value equals "/hello/world"': function(o) { assert.equal(o.value, '/hello/world'); },
	},
	"Path('/hello').join('world')": {
		topic: function() { return Path('/hello').join('world'); },
		'is instance of Path': function(o) { assert.instanceOf(o, Path); },
		'.value equals "/hello/world"': function(o) { assert.equal(o.value, '/hello/world'); },
	},
	"Testing joins": {
		"Path('/hello/').join('/world') equals '/hello/world'": function() { assert.equal( Path('/hello/').join('/world').value, '/hello/world' ); },
		"Path('/hello/').join('/world', 'bar') equals '/hello/world/bar'": function() { assert.equal( Path('/hello/').join('/world', 'bar').value, '/hello/world/bar' ); },
		"Path.join() throws TypeError": function() { assert.throws(function () { Path.join(); }, TypeError); },
		"Path.join('/hello/') equals '/hello'": function() { assert.equal( Path.join('/hello/').value, '/hello' ); },
		"Path.join('/hello/', '/world') equals '/hello/world'": function() { assert.equal( Path.join('/hello/', '/world').value, '/hello/world' ); },
		"Path.join('/hello/', '/world', 'foobar') equals '/hello/world/foobar'": function() { assert.equal( Path.join('/hello/', '/world', 'foobar').value, '/hello/world/foobar' ); },
	},
	"Testing other features": {
		"Path('/hello/world/foo.html').dirname() equals '/hello/world'": function() { assert.equal( Path('/hello/world/foo.html').dirname().value, '/hello/world' ); },
		"Path('/hello/world/foo.html').basename() equals 'foo.html'": function() { assert.equal( Path('/hello/world/foo.html').basename().value, 'foo.html' ); },
		"Path('/hello/world/foo.html').basename('.html') equals 'foo'": function() { assert.equal( Path('/hello/world/foo.html').basename('.html').value, 'foo' ); },
		"Path('/hello/world/foo.html').extname() equals '.html'": function() { assert.equal( Path('/hello/world/foo.html').extname().value, '.html' ); },
		"Path('/hello/world/foo.html').resolve() equals '/hello/world/foo.html'": function() { assert.equal( Path('/hello/world/foo.html').resolve().value, '/hello/world/foo.html' ); },
		"Path('.').resolve() works": function() { assert.equal( Path('.').resolve().value, require('path').resolve('.') ); },
		"Path('.').resolve('foo') works": function() { assert.equal( Path('.').resolve('foo').value, require('path').resolve('.') + '/foo' ); },
		"Path('/foo/bar').resolve('./baz') works": function() { assert.equal( Path('/foo/bar').resolve('./baz').value, '/foo/bar/baz' ); },
		"Path('wwwroot').resolve('static_files/png/', '../gif/image.gif') works": function() { assert.equal( Path('wwwroot').resolve('static_files/png/', '../gif/image.gif').value, require('path').resolve('.') + '/wwwroot/static_files/gif/image.gif' ); },
		"Path('/').resolve('static_files/png/', '../gif/image.gif') works": function() { assert.equal( Path('/').resolve('static_files/png/', '../gif/image.gif').value, '/static_files/gif/image.gif' ); },
		"Path('/foo/bar/1').relative('/foo/bar/2') works": function() { assert.equal( Path('/foo/bar/1').relative('/foo/bar/2').value, '../2' ); },
	},
}).export(module);

/* EOF */
