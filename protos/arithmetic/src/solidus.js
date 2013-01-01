/* Solidus */
var Q = require('q');
function op() {
	var args = Array.prototype.slice.call(arguments, 0, arguments.length);
	return args.reduce(function(a, b) {
		if(typeof a['operator/'] === 'function') { return a['operator/'](b); }
		return a / b;
	}, args.shift());
}
module.exports = op;
/*
module.exports = function solidus() {
	var args = Array.prototype.slice.call(arguments, 0, arguments.length);
	return Q.all(args).spread(op);
};
*/
