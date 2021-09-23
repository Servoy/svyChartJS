/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"2DF02F71-2246-43F2-AE39-8A47C9C7A563"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'doughnut',
		data: {
			labels: ["Red",
			"Green",
			"Yellow"],
			datasets: [{
				data: [300, 50, 100],
				backgroundColor: ["#FF6384",
				"#36A2EB",
				"#FFCE56"],
				hoverBackgroundColor: ["#FF6384",
				"#36A2EB",
				"#FFCE56"]
			}]
		}
	}

	var options = {	
		elements: {
			center: {
				// the longest text that could appear in the center
				maxText: '100%',
				text: 'DOH!',
				fontColor: '#36A2EB',
				fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				fontStyle: 'normal',
				minFontSize: 1,
				maxFontSize: 256
			}
		},
		tooltips: {
			callbacks: {
				label: {
					isFunction: true,
					params: ['tooltipItem', 'data'],
					expression: "return ' $'+data.datasets[0].data[tooltipItem.index];"
				}
			}
		}
	}


	var plugin = {
		id: 'demo_plugin',
		afterUpdate: { isFunction: true, params: ['chart'], expression: scopes.stringUtils.fnToString('chartPlugins','demoPlugin1_afterUpdate') },
		afterDraw: { isFunction: true, params: ['chart'], expression: scopes.stringUtils.fnToString('chartPlugins','demoPlugin1_afterDraw') }
	}

	elements.chart.setPlugin(plugin);
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}
