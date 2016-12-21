/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"EEA11968-CB88-4700-A680-54C0FF2DC322"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		var node = {
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
					hoverBorderColor: '#71B37C',
					yAxisID: 'y-axis-1'
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
					pointHoverBorderColor: '#000',
					yAxisID: 'y-axis-2'
				}]
			},
			options: {
				title: {
					text: 'Combined bar and line charts'
				},
				responsive: false,
				tooltips: {
					mode: 'label'
				},
				elements: {
					line: {
						fill: false
					}
				},
				scales: {
					xAxes: [{
						display: true,
						gridLines: {
							display: false
						},
						labels: {
							show: true
						},
						scaleLabel: {
							display: true,
							labelString: 'X Axis Title! YEE',
							fontSize: 16
						}
					}],
					yAxes: [{
						type: "linear",
						display: true,
						position: "left",
						id: "y-axis-1",
						gridLines: {
							display: false
						},
						labels: {
							show: true
						},
						scaleLabel: {
							display: true,
							labelString: 'Nothing',
							fontSize: 16
						}
					}, {
						type: "linear",
						display: true,
						position: "right",
						id: "y-axis-2",
						gridLines: {
							display: false
						},
						labels: {
							show: true
						},
						scaleLabel: {
							display: true,
							labelString: 'Something',
							fontSize: 16
						}
					}]
				}
			}
		};

		elements.chart.drawGraph(node);
	}
}
