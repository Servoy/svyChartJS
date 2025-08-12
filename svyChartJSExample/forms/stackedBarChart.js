/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"1A212DA3-03E6-40D0-A029-90CDCF3339CC"}
 */
function onShow(firstShow, event) {
	var data = {
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
		}
	};
	var options = {
		responsive: false,
		scales: {
			x: {
				stacked: true
			},
			y: {
				stacked: true
			}
		}
	};

	elements.chart.setData(data);
	elements.chart.setOptions(options);
}
