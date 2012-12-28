/* Minus */
module.exports = function minus(a, b) {
	if(typeof a['operator-'] === 'function') { return a['operator-'](b); }
	if(typeof b['operator-'] === 'function') { return b['operator-'](a); }
	return a - b;
};
