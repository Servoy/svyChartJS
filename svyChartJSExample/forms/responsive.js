/**
 * @param event
 *
 * @properties={typeid:24,uuid:"2200B80C-3038-4114-9ED6-A2C1CEC0550E"}
 */
function onShow( event) {
	//draw bar
	var data = {
		type: 'bar',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",

				// The properties below allow an array to be specified to change the value of the item at the given index
				// String  or array - the bar color
				backgroundColor: "#46BFBD",

				// String or array - bar stroke color
				borderColor: "rgba(220,220,220,1)",

				// Number or array - bar border width
				borderWidth: 1,

				// String or array - fill color when hovered
				hoverBackgroundColor: "#46bf81",

				// String or array - border color when hovered
				hoverBorderColor: "rgba(220,220,220,1)",

				// The actual data
				data: [65, 59, 80, 81, 56, 55, 40]
			}, {
				label: "My Second dataset",
				backgroundColor: "#FF5A5E",
				borderColor: "rgba(220,220,220,1)",
				borderWidth: 1,
				hoverBackgroundColor: "#ff8e90",
				hoverBorderColor: "rgba(220,220,220,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}]
		}}
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
	elements.bar_chart.setData(data);
	elements.bar_chart.setOptions(options);

	//draw doughnut
	data = {
		type: 'doughnut',
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
				"#FFC870"],
				borderColor: ["#F7464A",
				"#46BFBD",
				"#FDB45C"]
			}]
		}}

	elements.donut_chart.setData(data);

	// draw line
	data = {
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
		}}
	 options = {
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
		};
	elements.line_chart.setData(data);
	elements.line_chart.setOptions(options);
	//draw linechart
	data = {
		type: 'bar',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",

				// The properties below allow an array to be specified to change the value of the item at the given index
				// String  or array - the bar color
				backgroundColor: "#ff9a00",

				// String or array - bar stroke color
				borderColor: "rgba(220,220,220,1)",

				// Number or array - bar border width
				borderWidth: 1,

				// String or array - fill color when hovered
				hoverBackgroundColor: "#ffcc7f",

				// String or array - border color when hovered
				hoverBorderColor: "rgba(220,220,220,1)",

				// The actual data
				data: [65, 59, 80, 81, 56, 55, 40]
			}, {
				label: "My Second dataset",
				backgroundColor: "#08baff",
				borderColor: "rgba(220,220,220,1)",
				borderWidth: 1,
				hoverBackgroundColor: "#9ce3ff",
				hoverBorderColor: "rgba(220,220,220,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}]
		}}
		options = {
			responsive: false,
			scales: {
				xAxes: [{
					stacked: true
				}],
				yAxes: [{
					stacked: true
				}]
			}
		}

	elements.stacked_chart.setData(data);
	elements.stacked_chart.setOptions(options);
}
