/* Solidus */
module.exports = function solidus(a, b) {
	if(typeof a['operator/'] === 'function') { return a['operator/'](b); }
	return a / b;
};
