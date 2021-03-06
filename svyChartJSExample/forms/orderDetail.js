/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B1EE607A-EAB0-4387-881D-2DFB0D8B69DC"}
 */
var hoverBorderColor = 'white';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C210F395-52FD-4550-A7F8-45566EAFEF5D"}
 */
var borderColor = 'lightgrey';

/**
 * The type of the chart to display
 * @type {String}
 *
 * @properties={typeid:35,uuid:"99E3A4B1-CD0B-48C4-9650-4E72F57D68E4"}
 */
var chartType = 'pie';

/**
 * @properties={typeid:35,uuid:"86368A65-35B4-430B-AB3A-81088BA45066",variableType:-4}
 */
var color_scheme_1 = ['#5DA5DA',
	'#FAA43A',
	'#60BD68',
	'#F17CB0',
	'#B2912F',
	'#B276B2',
	'#DECF3F',
	'#F15854',
	'#4D4D4D']

/**
 * @properties={typeid:35,uuid:"51A2B050-D1FC-4642-9551-0ED76FD230D8",variableType:-4}
 */
var color_scheme_2 = ['#4D4D4D',
	'#F15854',
	'#DECF3F',
	'#5DA5DA',
	'#FAA43A',
	'#60BD68',
	'#F17CB0',
	'#B2912F',
	'#B276B2']

/**
 * @properties={typeid:35,uuid:"23CF66E1-7BEB-48B0-BD52-8C23F5DBD530",variableType:-4}
 */
var backgroundColor = color_scheme_1;

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"96C5C75D-D209-4860-A03A-B2856DC4AEA1"}
 */
function onDataChangeChartType(oldValue, newValue, event) {
	elements.chart.type = chartType;
	return true
}

/**
 * @param {Number} dataset_index
 * @param {Number} index
 * @param {string} label
 * @param {Number} value
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C8507FD4-BC47-449E-9FCE-3ECE3BE36D20"}
 */
function onClick(dataset_index, index, label, value, event) {

	// record index that was clicked
	var fsIndex = index + 1;

	//	sync with order details foundset
	orders_to_order_details.setSelectedIndex(fsIndex);

}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AFD1C338-043E-4F04-B5CC-45B8E9BFCD78"}
 */
function onShow(firstShow, event) {
}
