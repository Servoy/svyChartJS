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
		type: 'horizontalBar',
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
		legend: {
			display: false
		},
		showAllTooltips: true,
		tooltips: {
			backgroundColor: 'transparent',
			bodyFontColor: 'black',
			titleFontColor: 'black',
			bodyFontSize: 20,
			titleFontSize: 15,
			displayColors: false,
			caretSize:0,
			mode:'average',
			callbacks: {
				label: {
					isFunction: true,
					params: ['tooltipItem', 'data'],
					expression: "return data.datasets[0].data[tooltipItem.index];"
				}
			}
		},
		scales: {
			xAxes: [{
				labels: {
					show: true
				},
				gridLines: {
					display: true
				},
				scaleLabel: {
					display: true,
					labelString: 'Example plugin to display tooltips immediately',
					fontSize: 20
				},
				ticks: {
					display: true,
					beginAtZero: true,
					min: 0,
					max: 300,
					steps: 1,
					stepValue: 1
				}
			}],
			yAxes: [{
				stacked: true,
				display: true,
				position: "left",
				gridLines: {
					display: false
				},
				ticks: {
					fontColor: "white"
				},
				labels: {
					show: true
				}
			}]
		}
	}

	var plugin = {
		id: scopes.chartPlugins.demoPlugin2.id,
		beforeRender: { isFunction: true, params: ['chart'], expression: scopes.stringUtils.fnToString(scopes.chartPlugins.demoPlugin2.beforeRender) },
		afterDraw: { isFunction: true, params: ['chart', 'easing'], expression: scopes.stringUtils.fnToString(scopes.chartPlugins.demoPlugin2.afterDraw) }
	}

	elements.chart.setPlugin(plugin);
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}
