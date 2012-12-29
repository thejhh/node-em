/* */

// (a+b)+c

var Q = require('q');
var plus = require('arithmetic').operator.plus;

var a = Q.resolve(10);
var b = Q.resolve(20);
var c = Q.resolve(30);

plus(a, plus(b, c)).then(function(result) {
	console.log( 'Result: ' + result );
}).fail(function(err) {
	console.error( 'ERROR: ' + err );
}).done();

/* EOF */
