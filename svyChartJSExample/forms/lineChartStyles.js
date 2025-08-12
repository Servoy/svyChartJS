/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"43B35900-68D5-4AAD-AFFD-B7043C0A96D3"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "Unfilled",
				fill: false,
				backgroundColor: "blue",
				borderColor: "blue",				
				data: [-78, 2, -65, 67, 3, -4, 22]
			}, {
				label: "Dashed",
				fill: false,
				backgroundColor: "green",
				borderColor: "green",	
				borderDash: [5, 5],
				data: [65, 59, 80, 81, 56, 55, 40]
			}, {
				label: "Filled",
				fill: true,
				backgroundColor: "red",
				borderColor: "red",				
				data: [5, -10, 26, 28, -50, 55, 21],
				fill: true
			}]
		}
	}

	var options = {        
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            x: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            y: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
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
 * @properties={typeid:24,uuid:"0B413179-DFA2-48E8-ADE0-468AC5585153"}
 */
function getName() {
	return 'Line Chart Styles';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"8F503376-67AC-474F-B710-299FD1619D7B"}
 */
function getDescription() {
	return 'Line Chart Style Examples';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"89917A74-5745-4B97-8EA7-A3AAD02C85C1"}
 */
function getIconStyleClass() {
	return 'fa fa-line-chart';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"592C8336-24BC-4E89-BD0C-E11F3368B86D"}
 */
function getParent() {
	return forms.chartSamples;
}
