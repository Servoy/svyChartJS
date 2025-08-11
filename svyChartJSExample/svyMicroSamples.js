/**
 * @private 
 * @properties={typeid:35,uuid:"1932B5BB-CAB8-42D0-A75E-FD6A76A32432",variableType:-4}
 */
var log = scopes.svyLogManager.getLogger('com.servoy.extensions.svyMicroSamples');

/**
 * @public 
 * @return {scopes.svyLogManager.Logger}
 * @properties={typeid:24,uuid:"EA5C5C0F-BEED-4A20-B666-5C6A475B087C"}
 */
function getLogger(){
	return log;
}

/**
 * @public 
 * @return {Array<RuntimeForm<AbstractMicroSample>>}
 * @properties={typeid:24,uuid:"9CD32B28-B90A-43E1-A318-69B37634EB51"}
 */
function getParentForms() {
	
	// get all forms and filter out parents
	var parents = [];
	var samples = scopes.svyUI.getRuntimeFormInstances(forms.AbstractMicroSample)
	for(var i in samples){
		/** @type {RuntimeForm<AbstractMicroSample>} */
		var form = samples[i];
		if(!form.getParent()){
			parents.push(form); 
		}
	}
	
	// sort by name
	parents.sort(
		sortSamples
	);
	
	return parents;
}

/**
 * Gets all children of a parent form
 * @public 
 * @param {RuntimeForm<AbstractMicroSample>} parent
 * @return {Array<RuntimeForm<AbstractMicroSample>>}
 * @properties={typeid:24,uuid:"311BEDF5-5560-49BF-BABE-02C05D28E322"}
 */
function getChildren(parent){
	
	// get all forms and filter out children
	var children = [];
	var samples = scopes.svyUI.getRuntimeFormInstances(forms.AbstractMicroSample)
	for(var i in samples){
		/** @type {RuntimeForm<AbstractMicroSample>} */
		var form = samples[i];
		if(form.getParent() === parent){
			children.push(form);
		}
	}
	
	// sort by name
	children.sort(sortSamples);
	return children;
}

/**
 * Sorts samples alphabetically (assuming same level)
 * @private 
 * @param {RuntimeForm<AbstractMicroSample>} form1
 * @param {RuntimeForm<AbstractMicroSample>} form2
 *
 * @properties={typeid:24,uuid:"86547612-4D77-4216-8697-AA2129B2BE57"}
 */
function sortSamples(form1,form2){
	if(form1.getName() < form2.getName()){
		return -1
	}
	if(form1.getName() > form2.getName()){
		return 1
	}
	return 0;
}

/**
 * @properties={typeid:24,uuid:"191A9B3E-BBDC-4B45-B69F-17610DAD4C83"}
 */
function initInMemDatabase() {
	var serverName = "example_data";
	//var example_data_tables = databaseManager.getTableNames(serverName);
	var example_data_tables = ['categories', 'customers', 'orders'];
	for(var i = 0; i < example_data_tables.length; i++) {
		var tableName = example_data_tables[i];
		var ds = databaseManager.createEmptyDataSet();

		var dataSource = ds.createDataSource(tableName);
		var sourceFS = databaseManager.getFoundSet(serverName,tableName);
		sourceFS.loadAllRecords();
		var destFS = databaseManager.getFoundSet(dataSource);

		for (var j = 1; j <= sourceFS.getSize() && j < 500; j++) {
			var sourceRecord = sourceFS.getRecord(j);
			destFS.newRecord();
			databaseManager.copyMatchingFields(sourceRecord,destFS.getSelectedRecord());
		}
		databaseManager.saveData();
	}
}

/**
 * Callback method for when solution is opened.
 * When deeplinking into solutions, the argument part of the deeplink url will be passed in as the first argument
 * All query parameters + the argument of the deeplink url will be passed in as the second argument
 * For more information on deeplinking, see the chapters on the different Clients in the Deployment Guide.
 *
 * @param {String} arg startup argument part of the deeplink url with which the Client was started
 * @param {Object<Array<String>>} queryParams all query parameters of the deeplink url with which the Client was started
 *
 * @properties={typeid:24,uuid:"59A3D034-2FF7-4EFA-95EF-08E20D20BBDE"}
 */
function onSolutionOpen(arg, queryParams) {
//	initInMemDatabase();
//	plugins.svyhelp.callback = onHelpCalled;
//	plugins.svyhelp.helpEvent = 'mouseover';
//	plugins.svyhelp.helpMode = false;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"0F7C3360-9272-48AC-BD4B-A54E57B33106"}
 */
function onHelpCalled(event) {
	application.output(event);
}
