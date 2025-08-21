/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"4103590E-5A61-4831-ACEB-03EF42EF5DF9"}
 */
function onShow(firstShow, event) {
	var functionString = "function(ctx) {";
	functionString += "const color = 'rgba(1, 25, 255, 0.1)';";
	functionString += "if (ctx.dataset.data[ctx.dataIndex]) {"
	functionString += "return color.split('.1').join('.' + ctx.dataset.data[ctx.dataIndex].v);"
	functionString += "}";
	functionString += "}";
	
	var data = {
		type: 'treemap',
		data: {			
			datasets: [{
				label: 'Basic treemap',
	            tree: [6,6,5,4,3,2,2,1],
	            fontColor: '#000',
	            fontFamily: 'serif',
	            fontSize: 12,
	            fontStyle: 'normal',
	            backgroundColor: clientutils.generateBrowserFunction(functionString)
			}]
		}
	}


	elements.chart.setData(data);
}
