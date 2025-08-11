/**
 * Show the display name of the sample for navigation 
 * @public 
 * @return {String}
 * @properties={typeid:24,uuid:"BB1341DC-32B3-4BFC-9383-08978B655E9D"}
 */
function getName(){
	throw 'Method must be implemented'
}

/**
 * Show the description, i.e. tooltip
 * 
 * @public 
 * @return {String}
 * @properties={typeid:24,uuid:"7FC9C0A0-383E-4DD7-9B8A-64EA8D5BAC48"}
 */
function getDescription(){
	throw 'Method must be implemented'
}

/**
 * Gets the parent form for hierarchy
 * @public 
 * @return {RuntimeForm<AbstractMicroSample>}
 * @properties={typeid:24,uuid:"F8FA2DA4-52C7-4991-B9FB-84ACE55878C4"}
 */
function getParent(){
	return null;
}

/**
 * Gets an optional icon style class for menu navigation
 * @public 
 * @return {String}
 * @properties={typeid:24,uuid:"8BF2CCF5-EB59-42E3-8588-45DEFDD27EF9"}
 */
function getIconStyleClass(){
	return null;
}

/**
 * @public 
 * @return {String} Additioanl info (wiki markdown supported)
 * @properties={typeid:24,uuid:"A9652D5C-BB80-4041-B21E-C8B063DACBE5"}
 */
function getMoreInfo(){
	return null;
}

/**
 * @public 
 * @return {Array<String>} code lines
 * @properties={typeid:24,uuid:"2A73D035-DE84-4A22-94E5-D97C983E8993"}
 */
function getSampleCode(){
	return [];
}

/**
 * @public 
 * @return {String} Website URL
 * @properties={typeid:24,uuid:"CA5AFF86-6247-42B1-87D6-6F647643BD65"}
 */
function getWebSiteURL(){
	return null;
}

/**
 * @public 
 * @return {String} Download URL
 * @properties={typeid:24,uuid:"BBE5B778-C1CF-4C09-AEAF-AE9D7B5C06A4"}
 */
function getDownloadURL(){
	return null;
}

/**
 * TODO move to top level scope
 * 
 * @protected
 * @param functionToPrint
 * @return {Array<String>}
 * @properties={typeid:24,uuid:"D49BC9F5-83B0-4AF0-B736-45BF14479BAF"}
 */
function printMethodCode(functionToPrint) {
	var fd = new Packages.com.servoy.j2db.scripting.FunctionDefinition(functionToPrint);
	if (fd.getFormName()) {
		var jsForm = solutionModel.getForm(fd.getFormName());
		var jsMethod = jsForm.getMethod(fd.getMethodName());
		
		var lines = jsMethod.code.split('\n');
		var relevantLines = [];
		var functionStartFound = false;
		for (var i = 0; i < lines.length; i++) {
			if (!functionStartFound && utils.stringTrim(lines[i]).indexOf('function ') == 0) {
				functionStartFound = true;
			}
			if (functionStartFound && lines[i].indexOf('printMethodCode') == -1) {
				relevantLines.push(lines[i]);
			}
		}
		
		relevantLines.pop();
		return relevantLines;
		
//		var relevantCode = relevantLines.join('\n');
//		application.output(relevantCode);
		
//		forms.method_code.setMethodCode(relevantLines);
		
//		return relevantCode;
	} else {
		return [];
	}
}
