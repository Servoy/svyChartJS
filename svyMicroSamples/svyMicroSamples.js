/**
 * @private 
 * @properties={"typeid":35,"uuid":"52518A98-29C2-43E3-8815-5744A4D82ACF","variableType":-4}
 */
var log = scopes.svyLogManager.getLogger('com.servoy.extensions.svyMicroSamples');

/**
 * @public 
 * @return {scopes.svyLogManager.Logger}
 * @properties={"typeid":24,"uuid":"6111949E-153E-4729-A09C-BEECDBE4EE99"}
 */
function getLogger(){
	return log;
}

/**
 * @public 
 * @return {Array<RuntimeForm<AbstractMicroSample>>}
 * @properties={"typeid":24,"uuid":"06495180-369F-439E-8213-FC5B4C01373C"}
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
 * @properties={"typeid":24,"uuid":"0EF9909A-5437-4453-80DC-765FE70F7634"}
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
 * @properties={"typeid":24,"uuid":"A59D5FA2-2656-4BDB-913C-56CD8156F9E4"}
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
 * @properties={"typeid":24,"uuid":"B5A4ACE4-053E-4168-BB9B-E7C09401D85C"}
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
 * @properties={"typeid":24,"uuid":"3621BA7D-EB4B-4605-9553-A24BB456ED50"}
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
 * @properties={"typeid":24,"uuid":"89737115-7C0E-4D9F-B288-7E7C5FDE058E"}
 */
function onHelpCalled(event) {
	application.output(event);
}
