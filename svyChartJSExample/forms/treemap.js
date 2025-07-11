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
	
	
	
//	Previous implamentation - keep just for backup till an updated code occurs
//TODO: update implementation to match 4.4.9 chartjs version
//	var bgExpression =  "if(ctx.dataset.data[ctx.dataIndex])";
//		bgExpression += "{var value = ctx.dataset.data[ctx.dataIndex].v;}";
//		bgExpression += "else{alpha = 1;}; var alpha = (value + 3) / 10;";
//		bgExpression += "return Color('blue').alpha(alpha).rgbString();";
//		
//	var data = {
//		type: 'treemap',
//		data: {			
//			datasets: [{
//				label: 'Basic treemap',
//	            tree: [6,6,5,4,3,2,2,1],
//	            fontColor: '#000',
//	            fontFamily: 'serif',
//	            fontSize: 12,
//	            fontStyle: 'normal',
//				backgroundColor: {
//					isFunction: true,
//					params: ['ctx'],
//					expression: bgExpression
//				}
//			}]
//		}
//	}
//
//	var options = {
//		legend: {
//			display: false
//		},
//		title: {
//			display: true,
//			text: 'Treemap Chart'
//		},
//		tooltips: {
//			callbacks: {
//				label: {
//					isFunction: true,
//					params: ['tooltipItem', 'data'],
//					expression: "return data.datasets[0].data[tooltipItem.index]['s'];"
//				}
//			}
//		}
//	}
//	
//
//	elements.chart.setData(data);
//	elements.chart.setOptions(options);
}
