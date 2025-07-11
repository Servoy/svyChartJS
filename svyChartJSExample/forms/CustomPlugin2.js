/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"952FEDD0-3980-4D65-8E9F-25CB90393D78"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'bar',
		data: {
			labels: ["Red",
			"Green",
			"Yellow"],
			datasets: [{
				data: [150, 50, 100],
				backgroundColor: ["#FF6384",
				"green",
				"#FFCE56"],
				hoverBackgroundColor: ["#FF6384",
				"green",
				"#FFCE56"]
			}]
		}
	}

	var options = {
		indexAxis: 'y',
		legend: {
			display: false			
		},
		title:{
			display:true,
			text:'CUSTOM PLUGIN TO SHOW ALL TOOLTIPS AT SAME TIME'
		},
		showAllTooltips: true,
		tooltips: {
			backgroundColor: 'transparent',
			bodyFontColor: 'black',
			titleFontColor: 'black',
			bodyFontSize: 20,
			titleFontSize: 15,
			displayColors: false,
			caretSize: 0,
			mode: 'average',
			callbacks: {
				label: {
					isFunction: true,
					params: ['tooltipItem', 'data'],
					expression: "return data.datasets[0].data[tooltipItem.index];"
				}
			}
		}
	}
	
	var beforeRender = scopes.stringUtils.globalFnToString('chartPlugins','demoPlugin2_beforeRender')
	var afterRender = scopes.stringUtils.globalFnToString('chartPlugins','demoPlugin2_afterDraw')

	
//	Plugin that allows all tooltips to appear and stay active at once
	var plugin = {
		id: 'showAllTooltips',
		beforeRender: { isFunction: true, params: ['chart'], expression: beforeRender },
		afterDraw: { isFunction: true, params: ['chart', 'easing'], expression: afterRender }
	}
	
	elements.chart.setPlugin(plugin);
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}
