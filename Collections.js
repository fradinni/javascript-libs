///////////////////////////////////////////////////////////////////////////////
//
// Collection implementation.
// 
// Author: Nicolas FRADIN
// Date : 2012-11-13
//

var Collection = function(args) {
	this.elements = [];
	this.size = 0;
}

Collection.prototype._calculateCollectionSize = function() {
	this.size = 0;
	for(elmtPos in this.elements) {
		this.size ++;
	}
}

Collection.prototype.clear = function() {
	this.elements = [];
	this.size = 0;

	return this;
}

Collection.prototype.length = function() {
	return this.size;
}






///////////////////////////////////////////////////////////////////////////////
//
// List implementation.
// 
// Author: Nicolas FRADIN
// Date : 2012-11-13
//

//
// List constructor
//
var List = function(args) {
	Collection.apply(this, args)
}

List.prototype = new Collection();


//
// Add an element to the end of List
//
List.prototype.add = function(element) {
	this.elements.push(element);
	this._calculateCollectionSize();

	return this;
};


//
// Add an element to List at specfied index
//
List.prototype.addAt = function(index, element) {
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
	this._calculateCollectionSize();

	return this;
};


//
// Add an array of elements to list
//
List.prototype.addAll = function(elements) {
	for(pos in elements) {
		this.elements.push(elements[pos]);
	}
	this._calculateCollectionSize();

	return this;
};


//
// Remove specified element from List
//
List.prototype.remove = function(element) {
	var tmp = [];
	var removed = undefined;

	for(pos in this.elements) {
		if(element !== this.elements[pos]) {
			tmp.push(this.elements[pos]);
		} else {
			removed = this.elements[pos]
		}
	}

	this.elements = tmp;
	this._calculateCollectionSize();

	return this;
};


//
// Remove element at specified index from List
//
List.prototype.removeAt = function(index) {
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
	this._calculateCollectionSize();

	return this;
};


//
// Remove specified elements from list
//
List.prototype.removeAll = function(elmts) {

	for(elmtPos in elmts) {
		var pos = this.indexOf(elmts[elmtPos]);
		if(pos > -1) {
			this.removeAt(pos);
		}
	}

	return this;
};


//
// Remove all elements at specified positions from List
// 
List.prototype.removeAllAt = function(indexes) {
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
	this._calculateCollectionSize();

	return this;
};


//
// Return element at specified position
// 
List.prototype.get = function(index) {
	return this.elements[index];
};


//
// Get the position of specified element
//
List.prototype.indexOf = function(element) {
	return this.elements.indexOf(element);
};


//
// CHeck if List contains specified element
//
List.prototype.contains = function(element) {
	return (this.elements.indexOf(element) > -1);
};

//
// Sorting List elements ASCENDING
//
List.prototype.sort = function(params) {
	this.elements.sort(params);
	return this;
};


//
// Return an array containing List values
//
List.prototype.toArray = function() {
	return this.elements;
};


//
// Return a String representation of List
// [element1, element2, element3, ...]
//
List.prototype.toString = function() {
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
};


//
// Iterate on each element of List passing current element to callback method
//
// @param callback 	Callback method containing code to execute for each element.
// 					If callback method returns a value, this value will replace
//					current element;
//
List.prototype.each = function(callback) {
	for(elementPos in this.elements) {
		var ret = callback(this.elements[elementPos]);
		if(ret !== undefined) {
			this.elements[elementPos] = ret;
		}
	}
};


//
// Iterate on each element of List passing current element and current index
// to callback method
//
// @param callback 	Callback method containing code to execute for each element.
// 					If callback method returns a value, this value will replace
//					current element;
//
List.prototype.eachWithIndex = function(callback) {
	for(elementPos in this.elements) {
		var ret = callback(this.elements[elementPos], elementPos);
		if(ret !== undefined) {
			this.elements[elementPos] = ret;
		}
	}
};


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
List.prototype.find = function(callback) {
	for(elementPos in this.elements) {
		if(callback(this.elements[elementPos])) {
			return this.elements[elementPos];
		}
	}
	return undefined;
};


//
// Return matching elements in List passing current element to callback method
//
// @param callback 	Callback method returning the result of
// 					matching test for current element.
// @return elements Array of matching elements
//
List.prototype.findAll = function(callback) {
	var matches = [];
	for(elementPos in this.elements) {
		if(callback(this.elements[elementPos])) {
			matches.push(this.elements[elementPos]);
		}
	}

	return matches;
};

	
List.prototype._arrayContains = function(array, element) {
	for(pos in array) {
		if(element == array[pos]) {
			return true;
		} 
	}

	return false;
};










///////////////////////////////////////////////////////////////////////////////
//
// Map implementation.
// 
// Author: Nicolas FRADIN
// Date : 2012-11-13
//

var Map = function(args) {
	Collection.apply(this, args);
}

Map.prototype = new Collection();


//
// Add a key/value element to Map
//
// @param key
// @param value
//
Map.prototype.push = function(key, value) {
	var exists = this.get(key) !== undefined;
	if(exists) {
		throw new Error("The key ['"+key+"'] already exists in Map...");
	} else {
		this.elements.push([key, value]);
		this._calculateCollectionSize();
		return this;
	}
};


//
// Return value corresponding to specified key
//
// @param key
// @return value
//
Map.prototype.get = function(key) {
	for(pos in this.elements) {
		if(this.elements[pos][0] == key) {
			return this.elements[pos][1];
		}
	}
	return undefined;
};


//
// Remove element with specified key from Map
//
// @param key 	Key of element to remove
//
Map.prototype.remove = function(key) {
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
	this._calculateCollectionSize();

	return this;
};


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
Map.prototype.each = function(callback) {
	for(pos in this.elements) {
		var ret = callback(this.elements[pos][0], this.elements[pos][1]);
		if(ret !== undefined) {
			this.elements[pos][1] = ret;
		}
	}
};


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
Map.prototype.eachWithIndex = function(callback) {
	for(pos in this.elements) {
		var ret = callback(this.elements[pos][0], this.elements[pos][1], pos);
		if(ret !== undefined) {
			this.elements[pos][1] = ret;
		}
	}
};


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
Map.prototype.find = function(callback) {
	for(pos in this.elements) {
		if(callback(this.elements[pos][0], this.elements[pos][1])) {
			return this.elements[pos][0];
		}
	}
	return undefined;
};


//
// Return matching elements in Map passing current element 
// key and value to callback method
//
// @param callback 	Callback method returning the result of
// 					matching test for current element.
// @return keys		Array of matching elements keys
//
Map.prototype.findAll = function(callback) {
	var matches = [];
	for(pos in this.elements) {
		if(callback(this.elements[pos][0], this.elements[pos][1])) {
			matches.push(this.elements[pos][0]);
		}
	}
	return matches;
};







///////////////////////////////////////////////////////////////////////////////
//
// Stack implementation.
// 
// Author: Nicolas FRADIN
// Date : 2012-11-13
//


//
// Create new Stack
//
var Stack = function(args) {
	Collection.apply(this, args);
	this.elements = new List();
}


// Extend Stack from Collection
Stack.prototype = new Collection();


//
// Push an element in stack in first position
//
Stack.prototype.push = function(element) {
	if(this.size > 0) {
		this.elements.addAt(0, element);
	} else {
		this.elements.add(element);
	}
	this._calculateCollectionSize();
}


//
// Get an element from stack without removing it
//
Stack.prototype.peek = function(element) {
	if(!this.empty()) {
		return this.elements.get(0);
	} else {
		return undefined;
	}
	
}


//
// Pop an element from stack
//
Stack.prototype.pop = function(element) {
	if(!this.empty()) {
		var res = this.elements.get(0);
		this.elements.removeAt(0);
		this._calculateCollectionSize();
		return res;
	} else {
		return undefined;
	}
}


// 
// Return true if Stack is empty
//
Stack.prototype.empty = function() {
	return (this.size <= 0);
}

// @Override of Collection _calculateCollectionSize() method
Stack.prototype._calculateCollectionSize = function() {
	this.size = this.elements.length();
}

// @Override of Collection clear() method
Stack.prototype.clear = function() {
	this.elements = new List();
	this.size = 0;

	return this;
}

// @Override of Collection length() method
Stack.prototype.length = function() {
	return this.elements.length();
}
