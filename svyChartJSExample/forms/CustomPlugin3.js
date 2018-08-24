/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E6922878-DD17-4B7C-9C9A-8C579B233D6E"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'bar',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				type: 'bar',
				label: "Visitor",
				data: [200, 185, 590, 621, 250, 400, 95],
				fill: false,
				backgroundColor: 'rgba(113,179,124, 0.5)',
				borderColor: 'rgba(113,179,124, 1)',
				hoverBackgroundColor: 'rgba(255,255,0, 0.3)',
				hoverBorderColor: '#71B37C'
			}, {
				label: "Sales",
				type: 'line',
				data: [51, 65, 40, 49, 60, 37, 40],
				fill: false,
				borderColor: '#EC932F',
				backgroundColor: '#EC932F',
				pointBorderColor: '#EC932F',
				pointBackgroundColor: '#EC932F',
				pointHoverBackgroundColor: '#EC932F',
				pointHoverBorderColor: '#000'
			}]
		}
	}

	var options = {
		legend: {
			display: false
		},
		title: {
			display: true,
			text: 'CUSTOM PLUGIN TO SHOW DATA POINTS'
		},
		showDatapoints: true,
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

	var plugin = {
		id: scopes.chartPlugins.demoPlugin3.id,
		afterDatasetsDraw: { isFunction: true, params: ['chart'], expression: scopes.stringUtils.fnToString(scopes.chartPlugins.demoPlugin3.afterDatasetsDraw) }
	}

	elements.chart.setPlugin(plugin);	
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}
