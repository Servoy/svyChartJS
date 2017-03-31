/**
 * The type of the chart to display
 * @type {String}
 *
 * @properties={typeid:35,uuid:"99E3A4B1-CD0B-48C4-9650-4E72F57D68E4"}
 */
var chartType = 'pie';

/**
 *
 * @param {Number} index
 * @param {string} label
 * @param {Number} value
 *
 * @private
 *
 * @properties={typeid:24,uuid:"87FF09BC-CDBC-4742-A4EE-FBA5B0187CAD"}
 */
function onClick(index, label, value) {
	
	// record index that was clicked
	var fsIndex = index + 1;
	
	//	sync with order details foundset
	orders_to_order_details.setSelectedIndex(fsIndex);
}

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
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {Date} oldValue old value
 * @param {Date} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"90C2212B-47D1-4685-ADAD-17AC1FE60B08"}
 */
function onDataChange(oldValue, newValue, event) {
	// TODO Auto-generated method stub
	return true
}
