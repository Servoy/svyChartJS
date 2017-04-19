{
	"name": "svychartjs-chart",
	"displayName": "chart",
	"version": 1,
	"definition": "svychartjs/chart/chart.js",
	"serverscript": "svychartjs/chart/chart_server.js",
	"libraries": [{
			"name": "Chart.js",
			"version": "2.5.0",
			"url": "svychartjs/lib/js/Chart.js",
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
		"legendLabel" : {"type":"string", "default":"My Chart"},
		"backgroundColor" : {"type":"dataprovider"}, 
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
		"type" : {
			"type" : "string", 
			"values" : [{"BAR":"bar"},{"BUBBLE":"bubble"},{"DOUNT":"doughnut"},{"HORIZONTAL BAR":"horizontalBar"},{"LINE":"line"},{"PIE":"pie"},{"POLAR AREA":"polarArea"},{"RADAR":"radar"},{"SCATTER":"scatter"}]
		}
	},
	
	"handlers": {
      "onClick" : {
        "parameters" : [
            { "name" : "index", "type" : "int" },
            { "name" : "label", "type" : "string" },
            { "name" : "value", "type" : "int" }
        ]
}
    },
    
	"api": 
	{
		"drawChart": 
		{
		},
		"refreshChart": 
		{
		},
		"setOptions": 
		{
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
			"parameters": 
			[
				{
					"name": "data",
					"type": "object"
				}
			]
		}
	}
}