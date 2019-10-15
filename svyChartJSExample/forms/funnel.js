/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"1DAC7D01-495E-4664-9DB6-148D363CEC94"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'funnel',
		data: {
			labels: ["Red",
			"Green",
			"Yellow"],
			datasets: [{
				data: [300, 50, 100],
				backgroundColor: ["#F7464A",
				"#46BFBD",
				"#FDB45C"],
				hoverBackgroundColor: ["#FF5A5E",
				"#5AD3D1",
				"#FFC870"]
			}]
		}
	}

	var options = {
		legend: {
			display: false
		},
		title: {
			display: true,
			text: 'Funnel Chart'
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

	elements.chart.setData(data);
	elements.chart.setOptions(options);
}
