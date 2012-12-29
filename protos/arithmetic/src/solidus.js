/* Solidus */
var Q = require('q');
module.exports = function solidus() {
	var args = Array.prototype.slice.call(arguments, 0, arguments.length);
	return Q.fcall(function() {
		return args;
	}).spread(function() {
		var args2 = Array.prototype.slice.call(arguments, 0, arguments.length);
		return args2.reduce(function(a, b) {
			if(typeof a['operator/'] === 'function') { return a['operator/'](b); }
			return a / b;
		}, args2.shift());
	});
};
