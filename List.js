var List = function() {
	var self = this;

	self.elements = [];
	self.size = 0;
}

List.prototype = {
	
	add: function(element) {
		this.elements.push(element);
		this._calcListSize();

		return this;
	},

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

	addAll: function(elements) {
		for(pos in elements) {
			this.elements.push(elements[pos]);
		}
		this._calcListSize();

		return this;
	},

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

	removeAll: function(elmts) {

		for(elmtPos in elmts) {
			var pos = this.indexOf(elmts[elmtPos]);
			if(pos > -1) {
				this.removeAt(pos);
			}
		}

		return this;
	},

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

	get: function(index) {
		return this.elements[index];
	},

	indexOf: function(element) {
		return this.elements.indexOf(element);
	},

	contains: function(element) {
		return (this.elements.indexOf(element) > -1);
	},

	clear: function() {
		this.elements = [];
		this.size = 0;

		return this;
	},

	length: function() {
		return this.size;
	},

	sort: function(params) {
		this.elements.sort(params);
		return this;
	},

	toArray: function() {
		return this.elements;
	},

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

	each: function(callback) {
		for(elementPos in this.elements) {
			var ret = callback(this.elements[elementPos]);
			if(ret !== undefined) {
				this.elements[elementPos] = ret;
			}
		}
	},

	eachWithIndex: function(callback) {
		for(elementPos in this.elements) {
			var ret = callback(this.elements[elementPos], elementPos);
			if(ret !== undefined) {
				this.elements[elementPos] = ret;
			}
		}
	},

	find: function(callback) {
		for(elementPos in this.elements) {
			var ret = callback(this.elements[elementPos], elementPos);
			if(ret !== undefined) {
				this.elements[elementPos] = ret;
			}
		}
	},

	findAll: function(callback) {

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
