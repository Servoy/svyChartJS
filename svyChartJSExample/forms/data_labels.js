/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 *
 * @properties={typeid:24,uuid:"55BDDBC0-BF00-40FB-9F66-03C8AFB8BA06"}
 */
function onShow(firstShow, event) {
	var DATA_COUNT = 10;
	var labels = [];

	for (var i = 0; i < DATA_COUNT; ++i) {
		labels.push('' + i);
	}

	var dt = [];
	var dt1 = [];
	var dt2 = [];
	for (i = 0; i < DATA_COUNT; ++i) {
		dt.push(Math.ceil((Math.random() * 100)));
		dt1.push(Math.ceil((Math.random() * 100)));
		dt2.push(Math.ceil((Math.random() * 100)));
	}

	var data = {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				backgroundColor: 'teal',
				borderColor: 'teal',
				data: dt,
				datalabels: {
					align: 'start',
					anchor: 'start'
				}
			}, {
				backgroundColor: 'blue',
				borderColor: 'blue',
				data: dt1
			}, {
				backgroundColor: 'purple',
				borderColor: 'purple',
				data: dt2,
				datalabels: {
					align: 'end',
					anchor: 'end'
				}
			}]
		}
	}

	var options = {
		plugins: {
			datalabels: {
				backgroundColor: {
					isFunction: true,
					params: ['context'],
					expression: "return context.dataset.backgroundColor;"
				},
				borderRadius: 4,
				color: 'white',
				font: {
					weight: 'bold'
				},
				formatter: {
					isFunction: true,
					params: [''],
					expression: "return Math.round"
				},
				padding: 6
			}
		},

		// Core options
		legend: {
			display: false
		},
		title: {
			display: true,
			text: 'Data Labels'
		},
		aspectRatio: 5 / 3,
		layout: {
			padding: {
				top: 32,
				right: 16,
				bottom: 16,
				left: 8
			}
		},
		elements: {
			line: {
				fill: false
			}
		},
		tooltips: {
			  isFunction: true,
		      params: ['tooltipItem', 'data'],
		      expression: "return ''"
		},
		scales: {
			y: {
				stacked: true
			}
		}
	};

	elements.chart.setData(data);
	elements.chart.setOptions(options);
}

