/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E236194C-CD3E-4A24-B1AD-00E122F0145D"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		var node = {
			type: 'polarArea',
			data: {
				datasets: [{
					data: [60,
					32,
					53,
					14,
					22,
					],
					backgroundColor: ["#F7464A",
					"#46BFBD",
					"#FDB45C",
					"#949FB1",
					"#4D5360",
					],
					label: 'My dataset' // for legend
				}],
				labels: ["Red",
				"Green",
				"Yellow",
				"Grey",
				"Dark Grey"]
			},
			options: {
				responsive: false,
				elements: {
					arc: {
						borderColor: "#fff"
					}
				}
			}
		};

		elements.chart.drawGraph(node);
	}
}
