/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"1E7A52AE-F73C-40A4-A4C7-AF1BAFD959D0"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		var node = {
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
			},
			options: {
				responsive: false
			}
		};

		elements.chart.drawGraph(node);
	}
}
