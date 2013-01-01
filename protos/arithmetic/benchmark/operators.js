var arithmetic = require('../src/index.js'),
    operator = arithmetic.operator,
    equality = operator.equality,
    plus = operator.plus,
    minus = operator.minus,
	asterisk = operator.asterisk,
	modulo = operator.modulo,
	solidus = operator.solidus;
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// add tests
suite.add('arithmetic ((10+20)-10)*2 + 5*(30/20)', function() {
	return plus(asterisk(minus(plus(10, 20), 10), 2), asterisk(5,solidus(30, 20)));
}).add('standard ((10+20)-10)*2 + 5*(30/20)', function() {
	return ((10+20)-10)*2 + 5*(30/20);
}).on('cycle', function(event) {
	console.log(String(event.target));
}).on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run({ 'async': true });

/* EOF */
