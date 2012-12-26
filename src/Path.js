/* Prototype HTTP REST server for Web Service */
"use strict";

var node_path = require('path');

/** Constructor */
function Path(value) {
	var self = this;
	if(!(self instanceof Path)) {
		return (value instanceof Path) ? value : new Path(value);
	}
	if(typeof value !== 'string') {
		if(value instanceof Path) {
			self.value = value.value;
		} else {
			throw new TypeError('value in `Path(value)` must be a string, not ' + (typeof value) + '!');
		}
	} else {
		// FIXME: One thing to consider might be if normalize should be called only on demand like URL parsing is done...
		self.value = node_path.normalize(value).replace(/\/+$/, '');
		if(self.value === '') { self.value = '/'; }
	}
	Object.freeze(self);
}

/* Call this method to workaround lint errors "Missing 'new' prefix when invoking a constructor." */
Path.create = function(value) {
	var our_path = Path;
	return our_path(value);
};

/** Override default toString */
Path.prototype.toString = function() {
	var self = this;
	return self.value;
};

/** Override default toJSON */
Path.prototype.toJSON = function() {
	var self = this;
	return self.value;
};

/** Resolve */
Path.prototype.resolve = function() {
	var self = this;
	var paths = [self].concat(Array.prototype.slice.call(arguments, 0, arguments.length));
	return Path.create(node_path.resolve.apply(node_path, paths.map(function(p) {
		return Path.create(p).value;
	})));
};

/** Relative */
Path.prototype.relative = function(to) {
	var self = this;
	return Path.create(node_path.relative(self.value, Path.create(to).value));
};

/** Dirname */
Path.prototype.dirname = function() {
	var self = this;
	return Path.create(node_path.dirname(self.value));
};

/** Basename */
Path.prototype.basename = function(ext) {
	var self = this;
	return Path.create(node_path.basename(self.value, ext));
};

/** Extname */
Path.prototype.extname = function() {
	var self = this;
	return Path.create(node_path.extname(self.value));
};

/** Returns this Path joined to another and separated with slash.
 * @param path Another Path to append into this Path.
 * @returns New instance of Path object
 */
Path.prototype.join = function() {
	var self = this;
	var paths = [self].concat(Array.prototype.slice.call(arguments, 0, arguments.length));
	return Path.create(node_path.join.apply(node_path, paths.map(function(p) {
		return Path.create(p).value;
	})));
};

/** Returns all provided Path objects joined to each another.
 * @params Any amount of strings or Path objects
 * @returns New instance of Path object
 */
Path.join = function() {
	var args = Array.prototype.slice.call(arguments, 0, arguments.length);
	if(args.length === 0) { throw new TypeError("Path.join() called without arguments!"); }
	if(args.length === 1) { return Path.create(args.shift()); }
	return args.reduce(function(prev, current) {
		return prev.join(Path.create(current));
	}, Path.create(args.shift()) );
};

// 
module.exports = Path;

/* EOF */
