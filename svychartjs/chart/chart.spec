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
				"label", 
				"backgroundColor", 
				"borderColor", 
				"borderWidth",
				"hoverBackgroundColor",
				"hoverBorderColor",
				"hoverBorderWidth"] 
		},
		 "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :[]}
		,
		"node": 
		{
			"type": "object",
			"tags": 
			{
				"scope": "private"
			}
		},
		"type" : {
			"type" : "string", 
			"values" : [{"BAR":"bar"},{"DOUNT":"doughnut"},{"LINE":"line"},{"PIE":"pie"},{"POLAR AREA":"polarArea"}]
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
		"drawGraph": 
		{
			"parameters": 
			[
				{
					"name": "node",
					"type": "object"
				}
			]
		}
	}
}