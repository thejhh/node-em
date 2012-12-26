/* Prototype HTTP REST server for Web Service */
"use strict";

var node_url = require('url');

/** Constructor */
function URL(value, opts, flags) {
	var self = this;
	if(!(self instanceof URL)) {
		return ( (value instanceof URL) && (opts === undefined) ) ? value : new URL(value, opts);
	}
	if(typeof value !== 'string') {
		if(value instanceof URL) {
			self.value = value.value;
		} else {
			throw new TypeError('value in `URL(value)` must be a string, not ' + (typeof value) + '!');
		}
	} else {
		self.value = value;
	}
	opts = opts || {};
	flags = flags || {};
	self.parsed = flags.parsed || false;
	self.formated = flags.formated || false;
	var keys = Object.keys(opts);
	if(keys.length !== 0) {
		self.parsed = true;
		keys.forEach(function(key) {
			if( (self[key] === undefined) && (['string', 'number', 'boolean'].indexOf(typeof opts[key]) !== -1) ) {
				self[key] = opts[key];
			}
		});
	} else {
		(function() {
			var cache;
			['href', 'protocol', 'host', 'auth', 'hostname', 
			 'port', 'slashes', 'pathname', 'search', 'path', 'query', 
			 'hash'].forEach(function(key) {
				self.__defineGetter__(key, function(){
					if(cache === undefined) { cache = self.parse(); }
					return cache[key];
				});
			}); // forEach
		}());
	}
	Object.freeze(self);
}

/* Call this method to workaround lint errors "Missing 'new' prefix when invoking a constructor." */
URL.create = function(value, opts, flags) {
	var our_url = URL;
	return our_url(value, opts, flags);
};

/** Override default toString */
URL.prototype.toString = function() {
	var self = this;
	return self.value;
};

/** Override default toJSON */
URL.prototype.toJSON = function() {
	var self = this;
	return self.value;
};

/** Resolve */
URL.prototype.resolve = function(to) {
	var self = this;
	// FIXME: There could be support for more than one argument like Path's resolve has?
	return URL.create(node_url.resolve( self.value, URL.create(to).value));
};

/** Parse URL into object */
URL.prototype.parse = function() {
	var self = this;
	if(self.parsed) { return self; }
	// FIXME: Implement support for second and third params
	var obj = node_url.parse(self.value);
	return URL.create( obj.href, obj );
};

/** Parse URL into an object */
URL.parse = function(url) {
	return URL.create(url).parse();
};

/** Take parsed object and return a formated URL object */
URL.format = function(url) {
	if(url instanceof URL) {
		if(url.formated) { return url; }
		var tmp = url.parsed ? url : url.parse();
		return URL.create(node_url.format(tmp), tmp, {'formated':true});
	} else {
		return URL.create( node_url.format(url), undefined, {'formated':true} );
	}
};

// 
module.exports = URL;

/* EOF */
