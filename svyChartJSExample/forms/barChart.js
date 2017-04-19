/**
 * @properties={typeid:35,uuid:"E49D0234-269B-4B16-946A-5D652BD869E6",variableType:-4}
 */
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
	}

};

/**
 * @properties={typeid:35,uuid:"763F0F56-4B2C-40B5-BA30-BD85290320E9",variableType:-4}
 */
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
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}


/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"67AA61A4-1AF9-4FBB-85AC-262FE220F800"}
 */
function getName() {
	return 'Bar Chart'
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"C9F0B017-A884-41C6-97B6-1B56E21A73A4"}
 */
function getDescription() {
	return 'Bar Chart Implementation';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"A7FEF181-1245-41F3-A343-CA0FD218571F"}
 */
function getParent() {
	return forms.chartExamplesProvider;
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"80004826-6741-4FBA-93BB-A05EF64987FE"}
 */
function getIconStyleClass() {
	return 'fa fa-bar-chart';
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"33DAAE12-A1EC-4382-8321-309972A59F50"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/svyChartJS/releases/download/v1.0.0-b1/svyChartJSExample.servoy';
}

/**
 *
 * @return {String} Additioanl info (wiki markdown supported)
 *
 * @properties={typeid:24,uuid:"CF9E9F3A-1C06-4EEF-B969-69A6627280E5"}
 */
function getMoreInfo() {
	var url = 'https://raw.githubusercontent.com/Servoy/svyChartJS/master/README.md';
	return plugins.http.getPageData(url)
}

/**
 *
 * @return {Array<String>} code lines
 *
 * @properties={typeid:24,uuid:"4F671172-8AFF-4108-A1B3-5F74A176C967"}
 */
function getSampleCode() {
	return printMethodCode(node);
}
