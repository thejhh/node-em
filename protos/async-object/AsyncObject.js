/* AsyncObject Concept Testing */

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
			
			// Setting getters
			self.__defineGetter__(key, function(){
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
				var defer = Q.defer();
				try {
					process.nextTick(function() {
						try {
							cache[key] = value;
							defer.resolve(value);
						} catch(err) {
							defer.reject(err);
						}
					});
				} catch(err) {
					defer.reject(err);
				}
				// FIXME: Since it's a setter this promise doesn't 
				// actually go anywhere. We need another way to pass 
				// it back to the user.
				return defer.promise;
			});
			
		});


	}());
	Object.freeze(self);
}

Object.freeze(AsyncObject);
module.exports = AsyncObject;

/* EOF */
