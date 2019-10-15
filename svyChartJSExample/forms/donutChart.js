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
	var data = {
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
		}
	};
	var options = {
		plugins:{
			outlabels:false
		},
		title: {
			display: true,
			text: 'Line Chart'
		}
	}
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"1457134F-0ADF-499E-8BA5-1284A8D9CDDE"}
 */
function getName() {
	return 'Donuts Chart';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"00CCD64E-96CB-4DA7-AF26-6E846588C98F"}
 */
function getDescription() {
	return 'Mmmmm...Donuts';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"A22A6672-3753-4C25-BADB-2F51EABE936D"}
 */
function getParent() {
	return forms.chartSamples;
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"FA7B3F8F-C2FB-42C0-A052-E222C8E09B02"}
 */
function getIconStyleClass() {
	return 'fa fa-pie-chart';
}
