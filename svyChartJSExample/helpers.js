 /**
 * @param str
 * @param search
 * @param replacement
 * Replace all matching items in a string
 * @properties={typeid:24,uuid:"E28C9ECB-5631-40A6-A70B-14CE334F868F"}
 */
function replaceAll (str ,search, replacement) {
    return str.replace(new RegExp(search, 'g'), replacement);
};

/** 
 * @param {Function} fn
 * Convert a function's body into string
 * @properties={typeid:24,uuid:"F3529BD3-48AE-4FA6-8029-0D79ECFECBBC"}
 */
function fnToString(fn){
	/** @type {String} */	
	var s = fn.toString();
	var b = s.slice(s.indexOf("{") + 1, s.lastIndexOf("}"));
	b = b.replace(/(\r\n|\n|\r)/gm,"");
	b = replaceAll(b,'"',"'");
	return b;
}