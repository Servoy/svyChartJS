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
		plugins: {
			outlabels: false
		},
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

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"F7939AF1-69DE-4D09-A4CF-3DF72348B929"}
 */
function getName() {
	return 'Radar chart';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"F1CBD8A7-E81E-44CC-924C-08878E785EBE"}
 */
function getDescription() {
	return 'Radar Chart Example';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"D009DBFC-8769-4581-B4D2-34FB546334A1"}
 */
function getIconStyleClass() {
	return 'fa fa-cog';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"1CD636C7-5752-4A0D-86B4-B0ABD1173774"}
 */
function getParent() {
	return forms.chartSamples;
}
