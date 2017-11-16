/**
 * @properties={typeid:35,uuid:"4949FAC8-9FB3-4898-BC6A-7CFBA36B086B",variableType:-4}
 */
var data = {
	type: 'horizontalBar',
	data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "My First dataset",
			backgroundColor: "#46BFBD",
			borderColor: "rgba(220,220,220,1)",
			borderWidth: 1,
			hoverBackgroundColor: "#46bf81",
			hoverBorderColor: "rgba(220,220,220,1)",
			data: [-20, -5, 2, 81, 56, 55, 40]
		}, {
			label: "My Second dataset",
			backgroundColor: "#FF5A5E",
			borderColor: "rgba(220,220,220,1)",
			borderWidth: 1,
			hoverBackgroundColor: "#ff8e90",
			hoverBorderColor: "rgba(220,220,220,1)",
			data: [-65, -35, -4, 0, 86, 27, 90]
		}]
	}

};

/**
 * @properties={typeid:35,uuid:"E5536883-A384-4661-A1C2-536923027C38",variableType:-4}
 */
var options = {
    scales: {
        xAxes: [{
            gridLines: {
                offsetGridLines: true
            },
            scaleLabel: {
            	display: true,
				labelString: 'Data per month',
				fontSize: 16
            }
        }],
		yAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Months',
				fontSize: 16
			}
		}]
    }
}

/**
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"57BD980B-F996-486A-B3D3-03256B558AF5"}
 */
function onShow(firstShow, event) {
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}

/**
 * @properties={typeid:24,uuid:"2E56D04C-2AF8-4DB7-A866-C6331971CE1F"}
 */
function getName() {
	return 'Bar Chart Horizontal'
}

/**
 * @properties={typeid:24,uuid:"9A2303C7-A109-489F-A5E6-AA75E82DD778"}
 */
function getDescription() {
	return 'Bar Chart Horizontal Implementation';
}

/**
 * @properties={typeid:24,uuid:"3847760E-26A5-41F5-BE6F-45631A96CB7B"}
 */
function getParent() {
	return forms.chartSamples;
}

/**
 * @properties={typeid:24,uuid:"B2C0DC5D-FBAB-4698-89C9-39CDC1F186CA"}
 */
function getIconStyleClass() {
	return 'fa fa-bar-chart';
}

/**
 * @properties={typeid:24,uuid:"9B023E15-2430-4D6E-84CA-D793E6AE31AA"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/svyChartJS/releases/download/v1.0.0-b1/svyChartJSExample.servoy';
}

/**
 * @properties={typeid:24,uuid:"29697849-7DE3-4B02-98BB-64C3C9C32DD1"}
 */
function getMoreInfo() {
	var url = 'https://raw.githubusercontent.com/Servoy/svyChartJS/master/README.md';
	return plugins.http.getPageData(url)
}

/**
 * @properties={typeid:24,uuid:"1E88C0E4-76EC-4487-9D4D-DAC53ADE90B2"}
 */
function getSampleCode() {
	return printMethodCode(node);
}