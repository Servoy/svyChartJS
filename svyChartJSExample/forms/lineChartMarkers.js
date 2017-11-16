/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E5320052-1D50-42D2-8811-9B770DCC3D14"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
	            label: "My First dataset",
	            fill: false,
	            borderColor: "red",
	            backgroundColor: "red",
	            data: [65, 59, 80, 81, 56, 55, 40],
			    pointRadius: 10,
			    pointHoverRadius: 15,
			    showLine: false 
	        }, {
	            label: "My Second dataset",
	            fill: false,
	            borderColor: "blue",
	            backgroundColor: "blue",
	            data: [65, 59, 80, 81, 56, 55, 40],
			    pointRadius: 10,
			    pointHoverRadius: 15,
			    showLine: false 
	        }]
		}
	}
				

	elements.chart_one.setData(data);
	elements.chart_one.setOptions(setOptions('circle'));
	
	elements.chart_two.setData(data);
	elements.chart_two.setOptions(setOptions('rect'));
	
	elements.chart_three.setData(data);
	elements.chart_three.setOptions(setOptions('star'));
	
	elements.chart_four.setData(data);
	elements.chart_four.setOptions(setOptions('dash'));
}

/**
 * @properties={typeid:24,uuid:"D13630CB-ABF3-453D-B5A5-0E02B8A1939C"}
 */
function setOptions(pointStyle){
	var options = {		
        title:{
            display:true,
            text:'Point Style: ' + pointStyle
        },
        legend: {
            display: false
        },
        elements: {
            point: {
                pointStyle: pointStyle
            }
        }
	}
	return options;
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"A625ECCA-39B8-4D72-896E-8F4E63904C50"}
 */
function getName() {
	return 'Line Chart Marker Styles';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"D68B13BE-C15F-4E6C-B141-74F949B27E44"}
 */
function getDescription() {
	return 'Line Chart Marker Examples';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"220B757C-58B3-49E5-BA87-B5ED279BB106"}
 */
function getIconStyleClass() {
	return 'fa fa-line-chart';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"82339237-1DC3-40AC-9DA4-499130E5F0C2"}
 */
function getParent() {
	return forms.chartSamples;
}
