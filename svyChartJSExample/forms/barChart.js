/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"72957D4F-4C8A-46DE-A9B9-E9FC4DC4CCAE"}
 */
function onShow(firstShow, event) {
	//if (firstShow) {

	var node = {
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
	};
	elements.chart.drawGraph(node);
	//}
}
