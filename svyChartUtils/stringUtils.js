/**
 * @param str
 * @param search
 * @param replacement
 * Replace all matching items in a string
 * @properties={typeid:24,uuid:"7D4159EE-6924-48B9-AFCB-B4F509A185F6"}
 */
function replaceAll(str, search, replacement) {
	return str.replace(new RegExp(search, 'g'), replacement);
}
;

/**
 * @param {String} scope
 * @param {String} fn
 * Convert a function's body into string
 * @properties={typeid:24,uuid:"18D96B11-6C4B-4ED4-A3DF-069EEB870F67"}
 */
function fnToString(scope, fn) {
	/** @type {String} */
	var s = solutionModel.getGlobalMethod(scope, fn).code.split('*/')[1]
	var b = s.slice(s.indexOf("{") + 1, s.lastIndexOf("}"));
	b = b.split('\n')
	var r = [];
	for (var i = 0; i < b.length; i++) {
		if (b[i].indexOf('//')==-1){
			r.push(b[i])
		}
	}
	r = r.join('\n')
	r = r.replace(/(\r\n|\n|\r)/gm, "");
	r = replaceAll(r, '"', "'");
	return r;
}
