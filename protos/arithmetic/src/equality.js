/* Equality operator */
var Q = require('q');
module.exports = function() {
	var args = Array.prototype.slice.call(arguments, 0, arguments.length);
	// FIXME: equality does not need to wait until all promises are done -- it can fail if it detects two different values!
	return Q.fcall(function() {
		return args;
	}).spread(function() {
		var args2 = Array.prototype.slice.call(arguments, 0, arguments.length);
		var a = args2.shift();
		if(args2.length === 0) { throw new TypeError("No enough arguments"); }
		return args2.every(function(b) {
			if(typeof a['operator==='] === 'function') { return a['operator==='](b); }
			if(typeof b['operator==='] === 'function') { return b['operator==='](a); }
			return a === b ? true : false;
		});
	});
};
