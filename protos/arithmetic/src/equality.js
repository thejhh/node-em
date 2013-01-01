/* Equality operator */
var Q = require('q');
function op() {
	var args = Array.prototype.slice.call(arguments, 0, arguments.length);
	var a = args.shift();
	if(args.length === 0) { throw new TypeError("No enough arguments"); }
	return args.every(function(b) {
		if(typeof a['operator==='] === 'function') { return a['operator==='](b); }
		if(typeof b['operator==='] === 'function') { return b['operator==='](a); }
		return a === b ? true : false;
	});
}
module.exports = op;
/*
module.exports = function() {
	var args = Array.prototype.slice.call(arguments, 0, arguments.length);
	// FIXME: equality does not need to wait until all promises are done -- it can fail if it detects two different values!
	return Q.all(args).spread(op);
};
*/
