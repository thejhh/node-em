/* AsyncObject Concept Testing */
"use strict";

var Q = require('q');

function AsyncObject(data) {
	var self = this;
	
	if(!(self instanceof AsyncObject)) {
        if(data instanceof AsyncObject) { return data; }
        return new AsyncObject(data);
    }
	
	(function() {
		var cache = JSON.parse(JSON.stringify(data));
		
		Object.keys(data).forEach(function(key) {
			
			var set_promises = [];
			
			// Setting getters
			self.__defineGetter__(key, function(){
				console.log('DEBUG: self.__defineGetter__(' + key + ')');
				if(set_promises.length !== 0) {
					return set_promises.shift();
				}
				var defer = Q.defer();
				try {
					process.nextTick(function() {
						try {
							defer.resolve(cache[key]);
						} catch(err) {
							defer.reject(err);
						}
					});
				} catch(err) {
					defer.reject(err);
				}
				return defer.promise;
			});
			
			// Setting setters
			self.__defineSetter__(key, function(value){
				console.log('DEBUG: self.__defineSetter__(' + key + ', function('+value+'))');
				var defer = Q.defer();
				try {
					process.nextTick(function() {
						try {
							throw new Error("Test");
							//cache[key] = value;
							//defer.resolve(value);
						} catch(err) {
							defer.reject(err);
						}
					});
				} catch(err) {
					defer.reject(err);
				}
				// FIXME: Since it's a setter returned value doesn't 
				// actually go anywhere. We need another way to pass 
				// it back to the user.
				//return defer.promise;
				set_promises.push(defer.promise); // This works only after next time user uses the getter. Not good.
			});
			
		});

	}());
	Object.freeze(self);
}

Object.freeze(AsyncObject);
module.exports = AsyncObject;

/* EOF */
