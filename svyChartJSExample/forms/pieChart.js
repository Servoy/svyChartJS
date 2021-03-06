/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"D9F698EF-3BD4-4826-A2AF-1764C3D9B505"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'pie',
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
		layout: { padding: 100 },
		plugins: {
			outlabels: {
				text: '%l %p',
				textAlign: "center",
				color: 'white',
				stretch: 40,
				font: {
					resizable: true,
					minSize: 12,
					maxSize: 12
				}
			}
		},
		legend: {
			display: false
		},
		title: {
			display: true,
			text: 'Pie Chart'
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
