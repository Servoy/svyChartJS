/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"7B90BD9E-68A4-4F9B-B783-2A186BC3099A"}
 */
function onShow(firstShow, event) {

	var data = {
		type: 'radar',
		data: {
			labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
			datasets: [{
				label: "My First dataset",
				backgroundColor: "rgba(220,220,220,0.2)",
				borderColor: "rgba(220,220,220,1)",
				pointBackgroundColor: "rgba(220,220,220,1)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				data: [65, 59, 90, 81, 56, 55, 40]
			}, {
				label: "My Second dataset",
				backgroundColor: "rgba(151,187,205,0.2)",
				borderColor: "rgba(151,187,205,1)",
				pointBackgroundColor: "rgba(151,187,205,1)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(151,187,205,1)",
				data: [28, 48, 40, 19, 96, 27, 100]
			}]
		}
	}
	var options = {
		responsive: false,
		scale: {
			reverse: true,
			ticks: {
				beginAtZero: true
			}
		}
	}
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}
