 /**
 * @param str
 * @param search
 * @param replacement
 * Replace all matching items in a string
 * @properties={typeid:24,uuid:"7D4159EE-6924-48B9-AFCB-B4F509A185F6"}
 */
function replaceAll (str ,search, replacement) {
    return str.replace(new RegExp(search, 'g'), replacement);
};

/** 
 * @param {Function} fn
 * Convert a function's body into string
 * @properties={typeid:24,uuid:"18D96B11-6C4B-4ED4-A3DF-069EEB870F67"}
 */
function fnToString(fn){
	/** @type {String} */	
	var s = fn.toString();
	var b = s.slice(s.indexOf("{") + 1, s.lastIndexOf("}"));
	b = b.replace(/(\r\n|\n|\r)/gm,"");
	b = replaceAll(b,'"',"'");
	return b;
}