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
	if (firstShow) {
		var node = {
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
			},
			options: {
				responsive: false
			}
		};

		elements.chart.drawGraph(node);
	}
}
