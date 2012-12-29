"use strict";

var vows = require('vows');
var Q = require('q');
var assert = require('assert');
var arithmetic = require('../src/index.js'),
    operator = arithmetic.operator,
    equality = operator.equality,
    plus = operator.plus,
    minus = operator.minus,
	asterisk = operator.asterisk,
	modulo = operator.modulo,
	solidus = operator.solidus;

/* */
function handle_promise(fn) {
	return function() {
		var self = this;
		Q.when(fn.apply(self)).then(function(value) {
			self.callback(null, value);
		}).fail(function(err) {
			self.callback(err);
		}).done();
	};
}

/* */
function test(result) {
	var ret = {
		topic: handle_promise(function() {
			var code = this.context.name;
			//return (new Function( 'return (' + code + ')' )());
			return eval(code);
		})
    };
	ret['equals ' + result] = function(value) { assert.strictEqual(value, result); };
	return ret;
}

/* */
vows.describe('Testing operators').addBatch({
	'plus(10)': test(10),
	'plus(10, 20)': test(30),
	'plus(10, 20, 30)': test(60),
	'minus(30)': test(30),
	'minus(30, 20)': test(10),
	'minus(30, 20, 10)': test(0),
	'asterisk(30)': test(30),
	'asterisk(30, 20)': test(30*20),
	'asterisk(30, 20, 10)': test(30*20*10),
	'modulo(30)': test(30),
	'modulo(30, 20)': test(30%20),
	'modulo(30, 20, 10)': test(30%20%10),
	'solidus(30)': test(30),
	'solidus(30, 20)': test(30/20),
	'solidus(30, 20, 10)': test(30/20/10),
	'equality(30, 30)': test(true),
	'equality(30, 30, 30)': test(true),
	'equality(30, 20)': test(false),
	'equality(30, 20, 30)': test(false),
	'plus(asterisk(minus(plus(10, 20), 10), 2), asterisk(5,solidus(30, 20)))': test( ((10+20)-10)*2 + 5*(30/20) ),
}).export(module);

/* EOF */
