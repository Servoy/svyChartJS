/**
 * @properties={typeid:35,uuid:"ADD1D7D0-BE5B-4932-A81F-33A6993F1018",variableType:-4}
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
			hoverBackgroundColor: "#46bf81",
			hoverBorderColor: "rgba(220,220,220,1)",
			data: [-20, -5, 2, 81, 56, 55, 40],
			stack: 'Stack 0'
		}, {
			label: "My Second dataset",
			backgroundColor: "#FF5A5E",
			borderColor: "rgba(220,220,220,1)",
			borderWidth: 1,
			hoverBackgroundColor: "#ff8e90",
			hoverBorderColor: "rgba(220,220,220,1)",
			data: [-65, -35, -4, 0, 86, 27, 90],
			stack: 'Stack 0'
		}, {
			label: "My Third dataset",
			backgroundColor: "#000000",
			borderColor: "rgba(220,220,220,1)",
			borderWidth: 1,
			hoverBackgroundColor: "#808080",
			hoverBorderColor: "rgba(220,220,220,1)",
			data: [10, 35, 76, 3, 22, -40, -3],
			stack: 'Stack 1'
		}]
	}

};

/**
 * @properties={typeid:35,uuid:"3F358841-359A-4140-826B-5DD8153AA997",variableType:-4}
 */
var options = {
    scales: {
        x: {
        	stacked: true,
            gridLines: {
                offsetGridLines: true
            },
            scaleLabel: {
            	display: true,
				labelString: 'Months',
				fontSize: 16
            }
        },
		y: {
			stacked: true,
			scaleLabel: {
				display: true,
				labelString: 'Data',
				fontSize: 16
			}
		}
	}
}
/**
 * @param firstShow
 * @param event
 *
 * @properties={typeid:24,uuid:"14ABA63A-82FE-48E2-B008-8B18F2CDF9B9"}
 */
function onShow(firstShow, event) {
	elements.chart.setData(data);
	elements.chart.setOptions(options);
}

/**
 * @properties={typeid:24,uuid:"3DC5458B-46E2-41F8-AB65-4A658C1137DF"}
 */
function getName() {
	return 'Bar Chart Stacked'
}

/**
 * @properties={typeid:24,uuid:"AD85419E-D203-460A-A901-632AC987F91C"}
 */
function getDescription() {
	return 'Bar Chart Stacked Implementation';
}

/**
 * @properties={typeid:24,uuid:"3A6794B3-BA34-4186-A18C-C47F00DC48B6"}
 */
function getParent() {
	return forms.chartSamples;
}

/**
 * @properties={typeid:24,uuid:"4BA294A7-79B4-4FAB-B82E-F2BB79F069E7"}
 */
function getIconStyleClass() {
	return 'fa fa-bar-chart';
}

/**
 * @properties={typeid:24,uuid:"05BB6E1C-2F9E-417D-98A1-5337AA9FF3A3"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/svyChartJS/releases/download/v1.0.0-b1/svyChartJSExample.servoy';
}

/**
 * @properties={typeid:24,uuid:"EB39D87F-F87F-4350-907A-4F3437DABBF6"}
 */
function getMoreInfo() {
	var url = 'https://raw.githubusercontent.com/Servoy/svyChartJS/master/README.md';
	return plugins.http.getPageData(url)
}

/**
 * @properties={typeid:24,uuid:"82D515D8-ED72-4DB2-B716-0209B04ADD0F"}
 */
function getSampleCode() {
	return printMethodCode(node);
}