/**
 * @param str
 * @param search
 * @param replacement
 * Replace all matching items in a string
 * @properties={typeid:24,uuid:"4B04C35F-6617-492B-B041-C1C78127789A"}
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
 * @properties={typeid:24,uuid:"60874FC4-2D27-4A59-9026-2C8012B6E7CB"}
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
 * @properties={typeid:24,uuid:"4BD3A513-5EEF-4EBB-A938-D7C963F7C86D"}
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
 * @properties={typeid:24,uuid:"E66D940F-02B9-4194-9005-094A3BDA6E54"}
 */
function globalFnToString(scope, methodName) {
	var fn = solutionModel.getGlobalMethod(scope, methodName);
	if (!fn) {
		throw new Error("Can't get method '" + methodName + "' from global scope '" + scope + "'");
	}
	return fnToString(fn);
}
