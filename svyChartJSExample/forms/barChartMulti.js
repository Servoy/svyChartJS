/**
 * @properties={typeid:35,uuid:"D0F84D2F-D0B1-4956-A0BA-0BFD95626488",variableType:-4}
 */
var data = {
	type: 'bar',
	data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "My First dataset",
			backgroundColor: "#46BFBD",
			borderColor: "rgba(220,220,220,1)",
			borderWidth: 1,
			yAxisID: "y-axis-1",
			hoverBackgroundColor: "#46bf81",
			hoverBorderColor: "rgba(220,220,220,1)",
			data: [1, 24, -30, -81, 2, 36, 90]
		}, {
			label: "My Second dataset",
			backgroundColor: "#FF5A5E",
			borderColor: "rgba(220,220,220,1)",
			borderWidth: 1,
			yAxisID: "y-axis-2",
			hoverBackgroundColor: "#ff8e90",
			hoverBorderColor: "rgba(220,220,220,1)",
			data: [-76, -5, 24, 2, 1, -29, 8]
		}]
	}

};

/**
 * @properties={typeid:35,uuid:"67CE741C-9150-4E62-A6A7-2399D2CBE79A",variableType:-4}
 */
var options = {
    scales: {
        x: [{
            gridLines: {
                offsetGridLines: true
            },
            scaleLabel: {
            	display: true,
				labelString: 'Months',
				fontSize: 16
            }
        }],
        y: [{
            position: "left",
            id: "y-axis-1",
            scaleLabel: {
				display: true,
				labelString: 'Left yAxis',
				fontSize: 16
			}
        }, {
            position: "right",
            id: "y-axis-2",
            scaleLabel: {
				display: true,
				labelString: 'right yAxis',
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
 * @properties={typeid:24,uuid:"42C9E6BC-E2C1-40A6-AAC4-BE7803A0A654"}
 */
function onShow(firstShow, event) {	
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}


/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"0C07B4C4-BC43-4B09-92E4-500BB48240C4"}
 */
function getName() {
	return 'Bar Chart Multi Axis'
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"A2AA5CC3-0D6E-4DBB-8264-E7CA2847101D"}
 */
function getDescription() {
	return 'Bar Chart Multi Axis Implementation';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"8D2ADC30-AC59-4696-B378-F696CAB2BA98"}
 */
function getParent() {
	return forms.chartSamples;
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"D76E689E-365F-41B6-AD48-1E403F397E15"}
 */
function getIconStyleClass() {
	return 'fa fa-bar-chart';
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"BC519E59-2084-4959-892C-06926790CE2C"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/svyChartJS/releases/download/v1.0.0-b1/svyChartJSExample.servoy';
}

/**
 *
 * @return {String} Additioanl info (wiki markdown supported)
 *
 * @properties={typeid:24,uuid:"08BE6A85-BDF9-4034-B4F2-349294F8AFFE"}
 */
function getMoreInfo() {
	var url = 'https://raw.githubusercontent.com/Servoy/svyChartJS/master/README.md';
	return plugins.http.getPageData(url)
}

/**
 *
 * @return {Array<String>} code lines
 *
 * @properties={typeid:24,uuid:"CFE449C1-0891-44DE-BFB1-ECF506FF56CE"}
 */
function getSampleCode() {
	return printMethodCode(node);
}
