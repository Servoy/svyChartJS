{
	"name": "svychartjs-chart",
	"displayName": "Chart",
	"categoryName": "Visualization",
	"version": 1,
	"icon": "svychartjs/chart/icon.png",
	"definition": "svychartjs/chart/chart.js",
	"serverscript": "svychartjs/chart/chart_server.js",
	"libraries": [{
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
		"styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :[]}
		,
		"data": 
		{
			"type": "object",
			"tags": 
			{
				"scope": "private"
			}
		},
		"options": 
		{
			"type": "object",
			"tags": 
			{
				"scope": "private"
			}
		},	
		"plugin": 
		{
			"type": "object",
			"tags": 
			{
				"scope": "private"
			}
		},
		"type" : {
			"type" : "string", 
			"values" : [{"BAR":"bar"},{"BUBBLE":"bubble"},{"DOUGHNUT":"doughnut"},{"HORIZONTAL BAR":"horizontalBar"},{"LINE":"line"},{"PIE":"pie"},{"POLAR AREA":"polarArea"},{"RADAR":"radar"},{"SCATTER":"scatter"},{"FUNNEL":"funnel"}],
			"default" : "pie"
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
			"returns":"string" 
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
					"name": "plugins",
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