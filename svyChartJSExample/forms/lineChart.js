/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"9BD13350-2D5D-4DB8-89C6-0765B090E882"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",

				// Boolean - if true fill the area under the line
				fill: true,

				// String - the color to fill the area under the line with if fill is true
				backgroundColor: "rgba(70,191,189, 0.2)",

				// The properties below allow an array to be specified to change the value of the item at the given index

				// String or array - Line color
				borderColor: "#46BFBD",

				// String - cap style of the line. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
				borderCapStyle: 'butt',

				// Array - Length and spacing of dashes. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
				borderDash: [],

				// Number - Offset for line dashes. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
				borderDashOffset: 0.0,

				// String - line join style. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
				borderJoinStyle: 'miter',

				// String or array - Point stroke color
				pointBorderColor: "rgba(220,220,220,0.1)",

				// String or array - Point fill color
				pointBackgroundColor: "#FDB45C",

				// Number or array - Stroke width of point border
				pointBorderWidth: 1,

				// Number or array - Radius of point when hovered
				pointHoverRadius: 5,

				// String or array - point background color when hovered
				pointHoverBackgroundColor: "rgba(220,220,220,0.5)",

				// Point border color when hovered
				pointHoverBorderColor: "rgba(220,220,220,1)",

				// Number or array - border width of point when hovered
				pointHoverBorderWidth: 2,

				// Tension - bezier curve tension of the line. Set to 0 to draw straight Wlines connecting points
				tension: 0.1,

				// The actual data
				data: [65, 59, 80, 81, 56, 55, 40],

				// String - If specified, binds the dataset to a certain y-axis. If not specified, the first y-axis is used.
				yAxisID: "y-axis-1"
			}, {
				label: "My Second dataset",
				fill: false,
				backgroundColor: "#FF5A5E",
				borderColor: "#FF5A5E",
				pointBorderColor: "rgba(220,220,220,1)",
				pointBackgroundColor: "#000",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(220,220,220,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				data: [28, 48, 40, 19, 86, 27, 90]
			}]
		}
	}

	var options = {
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
					labelString: 'First 6 months',
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
					labelString: 'Numbers per month',
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
 * @properties={typeid:24,uuid:"7E8AF613-4FB5-4CEA-8523-C969A3E0C5FD"}
 */
function getName() {
	return 'Line Chart';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"28DA03A4-B1AB-4B43-8B06-C9DBA5611284"}
 */
function getDescription() {
	return 'Line Chart Example';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"49FDD9CA-DF90-41A3-B331-600F0E33E179"}
 */
function getIconStyleClass() {
	return 'fa fa-line-chart';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"C098CA21-7226-49EF-B91A-FA4DDD927CA4"}
 */
function getParent() {
	return forms.chartSamples;
}
