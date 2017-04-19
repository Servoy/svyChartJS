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
		}
	}

	var options = {
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

	elements.chart.setData(data);
	elements.chart.setOptions(options);
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"4CEC653C-9F04-4008-B08B-82783FA50A00"}
 */
function getName() {
	return 'Bar/Line Combo';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"E3A59EE8-6891-4753-81ED-FA8151577695"}
 */
function getDescription() {
	return 'Bar / Line Combination Example'
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"F17FEFD1-C92A-4617-8251-47ACB35025F9"}
 */
function getIconStyleClass() {
	return 'fa fa-line-chart';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"89644014-9B31-484B-AD5F-41A7D116936A"}
 */
function getParent() {
	return forms.chartExamplesProvider;
}
