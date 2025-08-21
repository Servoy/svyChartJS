/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E236194C-CD3E-4A24-B1AD-00E122F0145D"}
 */
function onShow(firstShow, event) {
	var data = {
		type: 'polarArea',
		data: {
			datasets: [{
				data: [60,32,53,14,22,],
				backgroundColor: ["red","green","yellow","grey","black",],
				label: 'My dataset' // for legend
			}],
			labels: ["Red","Green","Yellow","Grey","Black"]
		}
	}
	var options = {
		// ng1
		legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Chart.js Polar Area Chart'
        },
        scale: {
          ticks: {
            beginAtZero: true
          },
          reverse: false
        },
        animation: {
            animateRotate: false,
            animateScale: true
        },
        // ng2
        plugins: {
        	legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Polar Area Chart'
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
 * @properties={typeid:24,uuid:"93ACD1AD-1FD0-4B99-B635-834831278A2B"}
 */
function getName() {
	return 'Polar Area Chart';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"996A0496-95D7-473A-91A1-38891FFAB118"}
 */
function getDescription() {
	return 'Polar Area Chart Example';
}

/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"2AC42570-BCC4-4875-8A83-432153AC48A8"}
 */
function getIconStyleClass() {
	return 'fa fa-circle';
}

/**
 *
 * @return {RuntimeForm<AbstractMicroSample>}
 *
 * @properties={typeid:24,uuid:"D84711C8-7DF3-45EE-B5C1-3770DA31C9E9"}
 */
function getParent() {
	return forms.chartSamples;
}
