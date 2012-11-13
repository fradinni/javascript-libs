//
// Map implementation inspired by Groovy.
// 
// Author: Nicolas FRADIN
// Date : 2012-11-13
//

var Map = function() {
	this.elements = [];
	this.size = 0;
}

Map.prototype = {

	//
	// Add a key/value element to Map
	//
	// @param key
	// @param value
	//
	push: function(key, value) {
		var exists = this.get(key) !== undefined;
		if(exists) {
			throw new Error("The key ['"+key+"'] already exists in Map...");
		} else {
			this.elements.push([key, value]);
			return this;
		}
	},


	//
	// Return value corresponding to specified key
	//
	// @param key
	// @return value
	//
	get: function(key) {
		for(pos in this.elements) {
			if(this.elements[pos][0] == key) {
				return this.elements[pos][1];
			}
		}
		return undefined;
	},


	//
	// Remove element with specified key from Map
	//
	// @param key 	Key of element to remove
	//
	remove: function(key) {
		var tmp = [];
		var removed = undefined;

		for(pos in this.elements) {
			if(key !== this.elements[pos][0]) {
				tmp.push(this.elements[pos]);
			} else {
				removed = this.elements[pos]
			}
		}

		this.elements = tmp;
		this._calcListSize();

		return this;
	},


	//
	// Iterate on each map element passing key and value of
	// current element to callback method
	//
	// @param callback 	Callback method containing code to execute for each element.
	// 					If callback method returns a value, this value will replace
	//					current element value;
	//
	// Example:
	// 		map.each(function(key, value) {
	//			document.write("[key: " + key +", value: " + value + "]<br>");
	//		});
	//
	each: function(callback) {
		for(pos in this.elements) {
			var ret = callback(this.elements[pos][0], this.elements[pos][1]);
			if(ret !== undefined) {
				this.elements[pos][1] = ret;
			}
		}
	},


	//
	// Iterate on each map element passing key,value and index of
	// current element to callback method
	//
	// @param callback 	Callback method containing code to execute for each element.
	// 					If callback method returns a value, this value will replace
	//					current element value;
	//
	// Example:
	// 		map.eachWithIndex(function(key, value, index) {
	//			document.write(index+" -> [key: " + key +", value: " + value + "]<br>");
	//		});
	//
	eachWithIndex: function(callback) {
		for(pos in this.elements) {
			var ret = callback(this.elements[pos][0], this.elements[pos][1], pos);
			if(ret !== undefined) {
				this.elements[pos][1] = ret;
			}
		}
	},


	//
	// Return the first matching element in Map passing current element 
	// key and value to callback method
	//
	// @param callback 	Callback method returning the result of
	// 					matching test for current element.
	// @return key  First matching element key else returns undefined
	//
	// Example:
	//
	//		// Find key of first element containing String "str"
	//		var matchingElement = myMap.find(function(key, value) {
	//			return value.indexOf("str") > -1; // Test if element value contains "str"
	//		})
	//
	find: function(callback) {
		for(pos in this.elements) {
			if(callback(this.elements[pos][0], this.elements[pos][1])) {
				return this.elements[pos][0];
			}
		}
		return undefined;
	},


	//
	// Return matching elements in Map passing current element 
	// key and value to callback method
	//
	// @param callback 	Callback method returning the result of
	// 					matching test for current element.
	// @return keys		Array of matching elements keys
	//
	findAll: function(callback) {
		var matches = [];
		for(pos in this.elements) {
			if(callback(this.elements[pos][0], this.elements[pos][1])) {
				matches.push(this.elements[pos][0]);
			}
		}
		return matches;
	},


	//
	// Return number of elements in Map
	//
	length: function() {
		return this.size;
	},


	_calcListSize: function() {
		this.size = 0;
		for(elmtPos in this.elements) {
			this.size ++;
		}
	},

	_arrayContains: function(array, element) {
		for(pos in array) {
			if(element == array[pos]) {
				return true;
			} 
		}

		return false;
	}
}