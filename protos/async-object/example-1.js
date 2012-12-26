
var Q = require('q');
var AsyncObject = require('./AsyncObject.js');
var obj = new AsyncObject({'a':1000,'b':10000});

// Getting values
Q.spread([obj.a, obj.b], function (a, b) {
	console.log('a = ' + a + ', b = ' +b);
// Setting values
}).then(function() {
	return obj.a = 200;
}).then(function(a) {
	console.log('a changed to: ' + a);
// Catching errors
}).fail(function(err) {
	console.error('ERROR:' + err);
}).done();

/* EOF */
