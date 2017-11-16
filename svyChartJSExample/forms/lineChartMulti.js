/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"49D1C9F4-F343-4B56-A8BC-A31E903A5C94"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
	            label: "My First dataset",
	            borderColor: "red",
	            backgroundColor: "red",
	            fill: false,
	            data: [65, 59, 80, 81, 56, 55, 40],
	            yAxisID: "y-axis-1"
	        }, {
	            label: "My Second dataset",
	            borderColor: "blue",
	            backgroundColor: "blue",
	            fill: false,
	            data: [65, 59, 80, 81, 56, 55, 40],
	            yAxisID: "y-axis-2"
	        }]
		}
	}
	
	var options = {
		responsive: true,
        hoverMode: 'index',
        stacked: false,
        scales: {
            yAxes: [{
                type: "linear",
                display: true,
                position: "left",
                id: "y-axis-1"
            }, {
                type: "linear", 
                display: true,
                position: "right",
                id: "y-axis-2",

                gridLines: {
                    drawOnChartArea: false
                }
            }]
        }
	}

	elements.chart.setData(data);
	elements.chart.setOptions(options);

}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"FCBF6CB2-F0FA-43EF-A964-6BEF33D9919D"}
 */
function getName() {
	return 'Line Chart Multi Axis';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"3CFD2F47-A357-4C56-9F8D-989AEA8667C5"}
 */
function getDescription() {
	return 'Line Chart Multi Axis Example';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"CD239617-4A18-44E3-87DA-5F434426CB4A"}
 */
function getIconStyleClass() {
	return 'fa fa-line-chart';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"AA63EC2E-8368-44DA-B1B6-FC3FB74336D5"}
 */
function getParent() {
	return forms.chartSamples;
}
