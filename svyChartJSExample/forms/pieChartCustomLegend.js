/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"7435EF2D-07F1-4201-AB60-0594EBA99420"}
 */
function onShow(firstShow, event) {
	var data = {
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
		}
	}

	var options = {
		plugins: {
			outlabels: false
		},
		title:{
			display:true,
			text:'Pie Chart with a Custom Legend'
		},
		responsive: true,
		legend:{
			display:false
		},
		tooltips: {
			callbacks: {
				label: {
					isFunction: true,
					params: ['tooltipItem', 'data'],
					expression: "return ' $'+data.datasets[0].data[tooltipItem.index];"
				}
			}
		}
	}

	elements.chart.setData(data);
	elements.chart.setOptions(options);	
	//use custom legend html and store it to a label
	elements.legend.text = elements.chart.generateLegend();
	elements.legend.putClientProperty(APP_UI_PROPERTY.TRUST_DATA_AS_HTML, true);
}
