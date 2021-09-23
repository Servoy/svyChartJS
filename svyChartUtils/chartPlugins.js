/**
 * ChartJS Demo plugins
 * Client side only objects that can be registered as a ChartJS plugin
 */

/**
 * @type {Object}
 * Declared in place of Chart object to hide warnings.
 * @properties={typeid:35,uuid:"DC9F4413-4A43-4754-AFA2-0A3B07A8DB34",variableType:-4}
 */
var Chart;

/**
 * TODO generated, please specify type and doc for the params
 * @param chart
 *
 * @properties={typeid:24,uuid:"0869DFF1-7C6C-4C6F-9F96-5EC7DD99127F"}
 */
function demoPlugin1_afterUpdate(chart) {
	if (chart.config.options.elements.center) {
		var helpers = Chart['helpers'];
		var centerConfig = chart.config.options.elements.center;
		var globalConfig = Chart['defaults'].global;
		var ctx = chart.chart.ctx;

		var fontStyle = helpers['getValueOrDefault'](centerConfig['fontStyle'], globalConfig['defaultFontStyle']);
		var fontFamily = helpers['getValueOrDefault'](centerConfig['fontFamily'], globalConfig['defaultFontFamily']);

		if (centerConfig.fontSize)
			var fontSize = centerConfig.fontSize;
		// figure out the best font size, if one is not specified
		else {
			ctx['save']();
			fontSize = helpers['getValueOrDefault'](centerConfig['minFontSize'], 1);
			var maxFontSize = helpers['getValueOrDefault'](centerConfig['maxFontSize'], 256);
			var maxText = helpers['getValueOrDefault'](centerConfig['maxText'], centerConfig['text']);

			do {
				ctx.font = helpers['fontString'](fontSize, fontStyle, fontFamily);
				var textWidth = ctx['measureText'](maxText).width;

				// check if it fits, is within configured limits and that we are not simply toggling back and forth
				if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
					fontSize += 1;
				else {
					// reverse last step
					fontSize -= 1;
					break;
				}
			} while (true)
			ctx['restore']();
		}

		// save properties
		chart.center = {
			font: helpers['fontString'](fontSize, fontStyle, fontFamily),
			fillStyle: helpers['getValueOrDefault'](centerConfig['fontColor'], globalConfig['defaultFontColor'])
		};
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param chart
 *
 * @properties={typeid:24,uuid:"C8AB9F2E-79F0-4D07-A003-7735B493736C"}
 */
function demoPlugin1_afterDraw(chart) {
	if (chart.center) {
		var centerConfig = chart.config.options.elements.center;
		var ctx = chart.chart.ctx;

		ctx['save']();
		ctx.font = chart.center.font;
		ctx.fillStyle = chart.center.fillStyle;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
		var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
		ctx['fillText'](centerConfig['text'], centerX, centerY);
		ctx['restore']();
	}
}


/**
 * TODO generated, please specify type and doc for the params
 * @param chart
 * @param easing
 *
 * @properties={typeid:24,uuid:"7AD948DE-36AA-411A-98D8-C0FCB2DC4547"}
 */
function demoPlugin2_afterDraw(chart, easing) {
	if (chart.config.options.showAllTooltips) {
		// we don't want the permanent tooltips to animate, so don't do anything till the animation runs at least once
		if (!chart.allTooltipsOnce) {
			if (easing !== 1)
				return;
			chart.allTooltipsOnce = true;
		}

		// turn on tooltips
		chart.options.tooltips.enabled = true;
		Chart['helpers'].each(chart.pluginTooltips, function(tooltip) {
				tooltip.initialize();
				tooltip.update();
				// we don't actually need this since we are not animating tooltips
				tooltip.pivot();
				tooltip.transition(easing).draw();
			});
		chart.options.tooltips.enabled = false;
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param chart
 *
 * @properties={typeid:24,uuid:"56B37A70-3DF3-4AEF-84C6-31B06A48EB47"}
 */
function demoPlugin2_beforeRender(chart) {
	if (chart.config.options.showAllTooltips) {
		// create an array of tooltips
		// we can't use the chart tooltip because there is only one tooltip per chart
		chart.pluginTooltips = [];
		chart.config.data.datasets.forEach(function(dataset, i) {
			chart.getDatasetMeta(i).data.forEach(function(sector, j) {
				chart.pluginTooltips.push(new Chart['Tooltip']({
						_chart: chart.chart,
						_chartInstance: chart,
						_data: chart.data,
						_options: chart.options.tooltips,
						_active: [sector]
					}, chart));
			});
		});

		// turn off normal tooltips
		chart.options.tooltips.enabled = false;
	}
}

/**
 * @param chart
 *
 * @properties={typeid:24,uuid:"49F845C8-7518-4F77-B69B-CF0852B5A340"}
 */
function demoPlugin3_afterDatasetsDraw(chart){
	if (!chart.config.options.showDatapoints) return;
	var ctx = chart.ctx;

	chart.data.datasets.forEach(function(dataset, i) {
		var meta = chart.getDatasetMeta(i);
		if (!meta['hidden']) {
			meta['data'].forEach(function(element, index) {
				// Draw the text in black, with the specified font
				ctx.fillStyle = 'rgb(0, 0, 0)';

				var fontSize = 16;
				var fontStyle = 'normal';
				var fontFamily = 'Helvetica Neue';
				ctx.font = Chart['helpers'].fontString(fontSize, fontStyle, fontFamily);

				// Just naively convert to string for now
				var dataString = dataset.data[index].toString();

				// Make sure alignment settings are correct
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				var padding = 5;
				var position = element.tooltipPosition();
				ctx['fillText'](dataString, position['x'], position['y'] - (fontSize / 2) - padding);
			});
		}
	});
}