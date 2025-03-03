var chart;

var styleClass;

/**
 * Charts height to be set in a responsive form. When responsiveHeight is set to 0, the table will use 100% height of the parent container
 */
var responsiveHeight;

var data;

var options;

var plugin;

/**
 * HORIZONTAL BAR is no longer available on the latest ChartJS, please read the ChartJS documentation for replacing this type on TiNG
 */
var type;



var handlers = {
    /**
     * @param {Number} dataset_index
     * @param {Number} index
     * @param {String} label
     * @param {Number} value
     * @param {JSEvent} event
     */
    onClick: function() {},

    /**
     */
    onChartDrawn: function() {}
};

/**
 * Sets the data for this chart.<br/>
 * Should be an object that like:<br/>
 * <pre>
 * { 
 *     labels: string<array>,
 *     datasets: [{
 *       label: string,
 *       data: array<object>,
 *       fill: boolean,
 *       borderColor: 'rgb(75, 192, 192)',
 *       tension: number
 *     }]
 * }
 * </pre>
 * <br/>
 * See <a href="https://www.chartjs.org/docs/latest/general/data-structures.html">https://www.chartjs.org/docs/latest/general/data-structures.html</a>
 * 
 * @param {Object} data An object containing the chart data, including labels and datasets, structured according to Chart.js data model requirements.
 */
function setData(data) {}

/**
 * sets the options for this chart. 
 *
 * see https://www.chartjs.org/docs/latest/configuration/
 * for more info (this sets the options part of the configuration), 
 * some options can also be set through the setData() to be specific to that dataset.
 * 
 * @param {Object} options An object containing configuration options for the chart, such as layout, scales, and plugins, based on Chart.js options documentation.
 */
function setOptions(options) {}
 
/**
 * Return legend
 * 
 * @deprecated
 * 
 * @return {String} 
 */
function generateLegend() {
}

/** 
 * Return image as bass64
 * 
 * @return {String} The chart rendered as a base64-encoded image string.
 */
function getChartAsImage() {
}

/**
 * Refresh the chart (if options updated)
 */
function refreshChart() {
}

/**
 * Clears the chart and data.
 */
function clearChart() {
}

/**
 * (re)Draw the chart
 */
function drawChart() {
};

/**
 * Sets the plugins for the chart. Plugins allow you to extend or modify the behavior and appearance of the chart.
 *
 * @param {Object} plugin An object defining the plugin configuration, including hooks like `beforeDraw` or `afterRender`.
 */
function setPlugin() {
}
