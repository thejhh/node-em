"use strict";

var vows = require('vows');
var assert = require('assert');
var URL = require('../../src/URL.js');

/* */
vows.describe('Testing URL').addBatch({
	"URL": {
		topic: function() { return URL; },
		'is function': function(o) { assert.isFunction(o); },
		'has .create()': function(o) { assert.isFunction(o.create); },
		'has .parse()': function(o) { assert.isFunction(o.parse); },
		'has .format()': function(o) { assert.isFunction(o.format); },
		'has .prototype.toString()': function(o) { assert.isFunction(o.prototype.toString); },
		'has .prototype.toJSON()': function(o) { assert.isFunction(o.prototype.toJSON); },
		'has .prototype.resolve()': function(o) { assert.isFunction(o.prototype.resolve); },
		'has .prototype.parse()': function(o) { assert.isFunction(o.prototype.parse); },
    },
	"Testing URL constuctor": {
		"new URL() throws TypeError": function() { assert.throws(function () { new URL(); }, TypeError); },
		"new URL([]) throws TypeError": function() { assert.throws(function () { new URL([]); }, TypeError); },
		"new URL({}) throws TypeError": function() { assert.throws(function () { new URL({}); }, TypeError); },
		"new URL(1234) throws TypeError": function() { assert.throws(function () { new URL(1234); }, TypeError); },
		"new URL(null) throws TypeError": function() { assert.throws(function () { new URL(null); }, TypeError); },
		"new URL(true) throws TypeError": function() { assert.throws(function () { new URL(true); }, TypeError); },
		"new URL('http://www.jhh.me/foo/bar') does not throw Error": function() { assert.doesNotThrow(function () { new URL('http://www.jhh.me/foo/bar'); }, Error); },
		"URL(URL('http://www.jhh.me/foo/bar')) does not throw Error": function() { assert.doesNotThrow(function () { URL(URL('http://www.jhh.me/foo/bar')); }, Error); },
		"URL(new URL('http://www.jhh.me/foo/bar')) does not throw Error": function() { assert.doesNotThrow(function () { URL(new URL('http://www.jhh.me/foo/bar')); }, Error); },
		"new URL(URL('http://www.jhh.me/foo/bar')) does not throw Error": function() { assert.doesNotThrow(function () { new URL(URL('http://www.jhh.me/foo/bar')); }, Error); },
		"new URL(new URL('http://www.jhh.me/foo/bar')) does not throw Error": function() { assert.doesNotThrow(function () { new URL(new URL('http://www.jhh.me/foo/bar')); }, Error); },
		"URL('http://www.jhh.me/foo/bar').value equals": function() { assert.equal( URL('http://www.jhh.me/foo/bar').value, 'http://www.jhh.me/foo/bar'); },
	},
	"new URL('http://www.jhh.me/foo/bar')": {
		topic: function() { return new URL('http://www.jhh.me/foo/bar'); },
		'is instance of URL': function(o) { assert.instanceOf(o, URL); },
		'is immutable': function(o) { assert.throws(function () { o.foo = '/foo/bar'; assert.equal(o.foo, undefined);  }, TypeError); },
		'.value equals "http://www.jhh.me/foo/bar"': function(o) { assert.equal(o.value, 'http://www.jhh.me/foo/bar'); },
		'.value is immutable': function(o) { assert.throws(function () { o.value = '/foo/bar'; assert.equal(o.value, 'http://www.jhh.me/foo/bar');  }, TypeError); },
		'.toJSON() works': function(o) { assert.equal(o.toJSON(), 'http://www.jhh.me/foo/bar'); },
		'.toJSON() is immutable': function(o) { var foo = o.toJSON(); foo = '/foo/bar'; assert.equal(foo, '/foo/bar'); assert.equal(o.value, 'http://www.jhh.me/foo/bar'); },
		'.toString() works': function(o) { assert.equal(o.toString(), 'http://www.jhh.me/foo/bar'); },
		'.toString() is immutable': function(o) { var foo = o.toString(); foo = '/foo/bar'; assert.equal(foo, '/foo/bar'); assert.equal(o.value, 'http://www.jhh.me/foo/bar'); },
	},
	"URL(new URL('http://www.jhh.me/foo/bar'))": {
		topic: function() { return URL(new URL('http://www.jhh.me/foo/bar')); },
		'is instance of URL': function(o) { assert.instanceOf(o, URL); },
		'.value equals "http://www.jhh.me/foo/bar"': function(o) { assert.equal(o.value, 'http://www.jhh.me/foo/bar'); },
	},
	"new URL(new URL('http://www.jhh.me/foo/bar'))": {
		topic: function() { return new URL(new URL('http://www.jhh.me/foo/bar')); },
		'is instance of URL': function(o) { assert.instanceOf(o, URL); },
		'.value equals "http://www.jhh.me/foo/bar"': function(o) { assert.equal(o.value, 'http://www.jhh.me/foo/bar'); },
	},
	"Testing methods": {
		"URL('http://www.jhh.me').resolve('/foo/bar') works": function() { assert.equal( URL('http://www.jhh.me').resolve('/foo/bar').value, 'http://www.jhh.me/foo/bar' ); },
		"URL.format({'host':'example.com:80','protocol':'http:','pathname':'/resources/foo.html'}) works": function() { 
			assert.equal( URL.format({'host':'example.com:80','protocol':'http:','pathname':'/resources/foo.html'}).value, 'http://example.com:80/resources/foo.html' ); },
	},
	"Testing manual parse": {
		topic: function() { return new URL('http://user:pass@host.com:8080/p/a/t/h?query=string#hash').parse(); },
		'is instance of URL': function(o) { assert.instanceOf(o, URL); },
		'key length is correct': function(o) { assert.lengthOf(Object.keys(o), 15); },
		'.formated === false': function(o) { assert.equal(o.formated, false); },
		'.parsed === true': function(o) { assert.equal(o.parsed, true); },
		'.slashes === true': function(o) { assert.equal(o.slashes, true); },
		'.href === "http://user:pass@host.com:8080/p/a/t/h?query=string#hash"': function(o) { assert.equal(o.href, 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'); },
		'.protocol === "http:"': function(o) { assert.equal(o.protocol, 'http:'); },
		'.host === "host.com:8080"': function(o) { assert.equal(o.host, 'host.com:8080'); },
		'.auth === "user:pass"': function(o) { assert.equal(o.auth, 'user:pass'); },
		'.hostname === "host.com"': function(o) { assert.equal(o.hostname, 'host.com'); },
		'.port === "8080"': function(o) { assert.equal(o.port, '8080'); },
		'.pathname === "/p/a/t/h"': function(o) { assert.equal(o.pathname, '/p/a/t/h'); },
		'.search === "?query=string"': function(o) { assert.equal(o.search, '?query=string'); },
		'.path === "/p/a/t/h?query=string"': function(o) { assert.equal(o.path, '/p/a/t/h?query=string'); },
		'.query === "query=string"': function(o) { assert.equal(o.query, 'query=string'); },
		'.hash === "#hash"': function(o) { assert.equal(o.hash, '#hash'); },
	},
	"Testing magic parse": {
		topic: function() { return new URL('http://user:pass@host.com:8080/p/a/t/h?query=string#hash'); },
		'is instance of URL': function(o) { assert.instanceOf(o, URL); },
		'key length is correct': function(o) { assert.lengthOf(Object.keys(o), 15); },
		'.formated === false': function(o) { assert.equal(o.formated, false); },
		'.parsed === false': function(o) { assert.equal(o.parsed, false); },
		'.slashes === true': function(o) { assert.equal(o.slashes, true); },
		'.href === "http://user:pass@host.com:8080/p/a/t/h?query=string#hash"': function(o) { assert.equal(o.href, 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'); },
		'.protocol === "http:"': function(o) { assert.equal(o.protocol, 'http:'); },
		'.host === "host.com:8080"': function(o) { assert.equal(o.host, 'host.com:8080'); },
		'.auth === "user:pass"': function(o) { assert.equal(o.auth, 'user:pass'); },
		'.hostname === "host.com"': function(o) { assert.equal(o.hostname, 'host.com'); },
		'.port === "8080"': function(o) { assert.equal(o.port, '8080'); },
		'.pathname === "/p/a/t/h"': function(o) { assert.equal(o.pathname, '/p/a/t/h'); },
		'.search === "?query=string"': function(o) { assert.equal(o.search, '?query=string'); },
		'.path === "/p/a/t/h?query=string"': function(o) { assert.equal(o.path, '/p/a/t/h?query=string'); },
		'.query === "query=string"': function(o) { assert.equal(o.query, 'query=string'); },
		'.hash === "#hash"': function(o) { assert.equal(o.hash, '#hash'); },
	},
}).export(module);

/* EOF */
