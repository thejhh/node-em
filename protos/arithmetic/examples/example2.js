/* */

// (a+b)+c == a+(b+c)

equality(plus(plus(a, b), c), plus(a, plus(b, c))).then(function(result) {
	console.log( 'Result: ' + result );
}).fail(function(err) {
	console.error( 'ERROR: ' + err );
}).done();

/* EOF */
