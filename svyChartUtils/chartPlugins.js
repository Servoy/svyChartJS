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
 * Plugin that allows adding text to center of a chart
 * @properties={typeid:35,uuid:"48649E4B-B845-4F9C-A9A4-BF5F0CB28801",variableType:-4}
 */
var demoPlugin1 = {
	id: 'demo_plugin',
	afterUpdate: function(chart) {
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
	},
	afterDraw: function(chart) {
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
}

/**
 * Plugin that allows all tooltips to appear and stay active at once
 * @properties={typeid:35,uuid:"32F1A8B7-89AE-4B44-96A3-DBB8F8D9652C",variableType:-4}
 */
var demoPlugin2 = {
	id: 'demo_plugin_2',
	beforeRender: function(chart) {
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
	},
	afterDraw: function(chart, easing) {
		if (chart.config.options.showAllTooltips) {
			// we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
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

}
