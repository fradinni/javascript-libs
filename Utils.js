///////////////////////////////////////////////////////////////////////////////
// JavaScript utils
//
// Author: Nicolas FRADIN
// Date : 2012-11-14
//


///////////////////////////////////////////////////////////////////////////////
// Add methods to String class prototype
//


//
// Indicates if a String is empty or null
//
String.prototype.isBlank = function(str) {
	if(str !== undefined) {
		if(str.length > 0) return false
		else return true
	} else {
		return true;
	}
}


//
// Indicates if a String is not empty/null
//
String.prototype.isNotBlank = function() {
	if(this !== undefined) {
		if(this.length > 0) return true
		else return false
	} else {
		return false;
	}
}


//
// Removes leading and trailing whitespace
// 
String.prototype.trim = function() {
	return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))
}


//
// Indicates if String conains text
//
String.prototype.contains = function(text) {
	return (this.indexOf(text) > -1);
}


//
// Indicates if a String starts with text
//
String.prototype.endsWith = function(text) {
	return (this.match(text+"$")==text);
}


//
// Indicates if a String ends with text
//
String.prototype.startsWith = function(text) {
	return (this.match("^"+text)==text);
}


//
// Replace all occurences of a string
//
String.prototype.replaceAll = function(replace, with_this) {
	return this.replace(new RegExp(replace, 'g'), with_this);
}