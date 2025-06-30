{
	"name": "svychartjs-chart",
	"displayName": "Chart",
	"categoryName": "Visualization",
	"version": 1,
	"icon": "svychartjs/chart/icon.png",
	"definition": "svychartjs/chart/chart.js",
	"serverscript": "svychartjs/chart/chart_server.js",
	"doc": "svychartjs/chart/chart_doc.js",
	"libraries": [{
			"name": "moment",
			"version": "2.30.1",
			"url": "svychartjs/lib/js/moment-with-locales.min.js",
			"mimetype": "text/javascript"
		},{
			"name": "Chart.js",
			"version": "2.7.2",
			"url": "svychartjs/lib/js/Chart.js",
			"mimetype": "text/javascript"
		},{
			"name": "pieoutlabels.js",
			"version": "0.0.1",
			"url": "svychartjs/lib/js/chartjs-plugin-piechart-outlabels.js",
			"mimetype": "text/javascript"
		},{
			"name": "funnelchart.js",
			"version": "0.0.1",
			"url": "svychartjs/lib/js/chart.funnel.js",
			"mimetype": "text/javascript"
		},{
			"name": "treemap.js",
			"version": "0.2.3",
			"url": "svychartjs/lib/js/Chart.treemap.js",
			"mimetype": "text/javascript"
		},{
			"name": "Chart.datalabel.js",
			"version": "2.0.0",
			"url": "svychartjs/lib/js/Chart.datalabel.js",
			"mimetype": "text/javascript"
		}],
	"model": 
	{
		"chart" : {"type" : "object", "tags" : {"scope" : "private"}},
		"foundset" : { 
			"type": "foundset", 
			"dataproviders": [
				"value", 
				"label"] 
		},
		"legendLabel" : {"type":"dataprovider"},
		"backgroundColor" : {"type":"dataprovider"},
		"backgroundColorScheme" : {
			"type" : "string", 
			"values" : ["facebook","bootstrap","space_gray","cappuccino","beach","blues","metro","turquoise_shades","retro","pastel_rainbow","pwc_corp","sage_cream","pink_shades","craftsman","minimal_fire","modern_1","modern_2","modern_3","modern_muted"],
			"default" : "default_color_scheme"
		}, 
		"borderColor":{"type":"dataprovider"}, 
		"borderWidth":{"type":"dataprovider"},
		"hoverBackgroundColor":{"type":"dataprovider"},
		"hoverBorderColor":{"type":"dataprovider"},
		"hoverBorderWidth":{"type":"dataprovider"},
		"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :[]},
		"responsiveHeight": { "type": "int", "default": 300, "tags": {"doc": "Charts height to be set in a responsive form. When responsiveHeight is set to 0, the table will use 100% height of the parent container"} },
		"data": 
		{
			"type": "json",
			"tags": 
			{
				"scope": "private"
			}
		},
		"options": 
		{
			"type": "json",
			"tags": 
			{
				"scope": "private"
			}
		},	
		"plugin": 
		{
			"type": "json",
			"tags": 
			{
				"scope": "private"
			}
		},
		"type" : {
			"type" : "string", 
			"values" : [{"BAR":"bar"},{"BUBBLE":"bubble"},{"DOUGHNUT":"doughnut"},{"HORIZONTAL BAR (DEPRECATED ON TiNG)":"horizontalBar"},{"LINE":"line"},{"PIE":"pie"},{"POLAR AREA":"polarArea"},{"RADAR":"radar"},{"SCATTER":"scatter"},{"FUNNEL":"funnel"},{"TREEMAP":"treemap"}],
			"default" : "pie",
			"tags": {"doc": "HORIZONTAL BAR is no longer available on the latest ChartJS, please read the ChartJS documentation for replacing this type on TiNG"}
		}
	},
	
	"handlers": {
		"onClick" : {
	        "parameters" : [
	            { "name" : "dataset_index", "type" : "int" },
	            { "name" : "index", "type" : "int" },
	            { "name" : "label", "type" : "string" },
	            { "name" : "value", "type" : "int" },
	            { "name" : "event", "type" : "JSEvent" }
	        ]
		},
		"onChartDrawn" : {
			"parameters" : [
	        ]
		}
    },
    
	"api": 
	{
		"generateLegend": { 
			"delayUntilFormLoads": true,
			"returns":"string",
			"deprecated": true
		},
		"clearChart": {
			"delayUntilFormLoads": true
		},
		"drawChart": {
			"delayUntilFormLoads": true
		},
		"refreshChart": {
			"delayUntilFormLoads": true
		},
		"setPlugin": 
		{
			"delayUntilFormLoads": true,
			"parameters": 
			[
				{
					"name": "plugin",
					"type": "object"
				}
			]
		},
		"setOptions": 
		{
			"delayUntilFormLoads": true,
			"parameters": 
			[
				{
					"name": "options",
					"type": "object"
				}
			]
		},
		"setData": 
		{
			"delayUntilFormLoads": true,
			"parameters": 
			[
				{
					"name": "data",
					"type": "object"
				}
			]
		},
		"getChartAsImage":
		{
			"delayUntilFormLoads": true,
			"returns": "string"
		}
	}
}