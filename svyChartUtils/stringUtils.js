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
 * @private
 *
 * @param {JSMethod} fn
 * @return {String}
 *
 * @properties={typeid:24,uuid:"18D96B11-6C4B-4ED4-A3DF-069EEB870F67"}
 */
function fnToString(fn) {
	/** @type {String} */
	var s = fn.code.split('*/')[1]
	var b = s.slice(s.indexOf("{") + 1, s.lastIndexOf("}"));
	b = b.split('\n')
	var r = [];
	for (var i = 0; i < b.length; i++) {
		if (b[i].indexOf('//') == -1) {
			r.push(b[i])
		}
	}
	r = r.join('\n')
	r = r.replace(/(\r\n|\n|\r)/gm, "");
	r = replaceAll(r, '"', "'");
	return r;
}

/**
 * Convert a form function's body into string
 *
 * @param {String} formName
 * @param {String} methodName
 * @return {String}
 *
 * @properties={typeid:24,uuid:"D3E14A89-26DF-4946-9B17-A319A08F6C93"}
 */
function formFnToString(formName, methodName) {
	var form = solutionModel.getForm(formName);
	if (!form) {
		throw new Error("Can't get form '" + formName + "'");
	}
	var fn = form.getMethod(methodName);
	if (!fn) {
		throw new Error("Can't get method '" + methodName + "' from form '" + formName + "'");
	}
	return fnToString(fn);
}

/**
 * Convert a global function's body into string
 *
 * @param {String} scope
 * @param {String} methodName
 * @return {String}
 *
 * @properties={typeid:24,uuid:"8145D42A-80FE-4A07-922F-788118B09D51"}
 */
function globalFnToString(scope, methodName) {
	var fn = solutionModel.getGlobalMethod(scope, methodName);
	if (!fn) {
		throw new Error("Can't get method '" + methodName + "' from global scope '" + scope + "'");
	}
	return fnToString(fn);
}
