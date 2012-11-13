//
// List implementation inspired by Groovy.
// 
// Author: Nicolas FRADIN
// Date : 2012-11-13
//


//
// List constructor
//
var List = function() {
	var self = this;

	self.elements = [];
	self.size = 0;
}


List.prototype = {
	
	//
	// Add an element to List
	//
	add: function(element) {
		this.elements.push(element);
		this._calcListSize();

		return this;
	},


	//
	// Add an element to List at specfied index
	//
	addAt: function(index, element) {
		var tmp = []
		var listPos = 0;

		// add elements before index
		for(var i=0; i < index; i++) {
			tmp.push(this.elements[i]);
		}

		// all new element
		tmp.push(element);

		// add elements after index
		for(var i = index; i< this.size; i++) {
			tmp.push(this.elements[i]);
		}

		this.elements = tmp;
		this._calcListSize();

		return this;
	},


	//
	// Add an array of elements to list
	//
	addAll: function(elements) {
		for(pos in elements) {
			this.elements.push(elements[pos]);
		}
		this._calcListSize();

		return this;
	},


	//
	// Remove specified element from List
	//
	remove: function(element) {
		var tmp = [];
		var removed;

		for(pos in this.elements) {
			if(element !== this.elements[pos]) {
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
	// Remove element at specified index from List
	//
	removeAt: function(index) {
		var tmp = [];
		var removed;
		for(pos in this.elements) {
			if(pos != index) {
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
	// Remove specified elements from list
	//
	removeAll: function(elmts) {

		for(elmtPos in elmts) {
			var pos = this.indexOf(elmts[elmtPos]);
			if(pos > -1) {
				this.removeAt(pos);
			}
		}

		return this;
	},


	//
	// Remove all elements at specified positions from List
	// 
	removeAllAt: function(indexes) {
		var tmp = [];
		var removed = [];
		for(elmtPos in this.elements) {
			if(!this._arrayContains(indexes, elmtPos)) {
				tmp.push(this.elements[elmtPos]);
			} else {
				removed.push(this.elements[elmtPos]);
			}
		}
		this.elements = tmp;
		this._calcListSize();

		return this;
	},


	//
	// Return element at specified position
	// 
	get: function(index) {
		return this.elements[index];
	},


	//
	// Get the position of specified element
	//
	indexOf: function(element) {
		return this.elements.indexOf(element);
	},


	//
	// CHeck if List contains specified element
	//
	contains: function(element) {
		return (this.elements.indexOf(element) > -1);
	},


	//
	// Clear List
	//
	clear: function() {
		this.elements = [];
		this.size = 0;

		return this;
	},


	// Return the number of elements in List
	length: function() {
		return this.size;
	},


	//
	// Sorting List ASCENDING
	//
	sort: function(params) {
		this.elements.sort(params);
		return this;
	},


	//
	// Return an array containing List values
	//
	toArray: function() {
		return this.elements;
	},


	//
	// Return a String representation of List
	// [element1, element2, element3, ...]
	//
	toString: function() {
		var str = "[";
		for(pos in this.elements) {
			if(pos == 0) {
				str += this.elements[pos];
			} else {
				str += ", " + this.elements[pos];
			}
		}
		str += "]";

		return str;
	},


	//
	// Iterate on each element of List passing current element to callback method
	//
	// @param callback 	Callback method containing code to execute for each element.
	// 					If callback method returns a value, this value will replace
	//					current element;
	//
	each: function(callback) {
		for(elementPos in this.elements) {
			var ret = callback(this.elements[elementPos]);
			if(ret !== undefined) {
				this.elements[elementPos] = ret;
			}
		}
	},


	//
	// Iterate on each element of List passing current element and current index
	// to callback method
	//
	// @param callback 	Callback method containing code to execute for each element.
	// 					If callback method returns a value, this value will replace
	//					current element;
	//
	eachWithIndex: function(callback) {
		for(elementPos in this.elements) {
			var ret = callback(this.elements[elementPos], elementPos);
			if(ret !== undefined) {
				this.elements[elementPos] = ret;
			}
		}
	},


	//
	// Return the first matching element in List passing current element to callback method
	//
	// @param callback 	Callback method returning the result of
	// 					matching test for current element.
	// @return element  First matching element else returns undefined
	//
	// Example:
	//
	//		// Find first element containing String "str"
	//		var matchingElement = myList.find(function(it) {
	//			return it.indexOf("str") > -1; // Test if element contains "str"
	//		})
	//
	find: function(callback) {
		for(elementPos in this.elements) {
			if(callback(this.elements[elementPos])) {
				return this.elements[elementPos];
			}
		}
		return undefined;
	},


	//
	// Return matching elements in List passing current element to callback method
	//
	// @param callback 	Callback method returning the result of
	// 					matching test for current element.
	// @return elements Array of matching elements
	//
	findAll: function(callback) {
		var matches = [];
		for(elementPos in this.elements) {
			if(callback(this.elements[elementPos])) {
				matches.push(this.elements[elementPos]);
			}
		}

		return matches;
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
};


var test = new List();
test.add("element1");
