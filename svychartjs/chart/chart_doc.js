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
 * @param {object} data
 */
function setData(data) {}

/**
 * sets the options for this chart. 
 *
 * see https://www.chartjs.org/docs/latest/configuration/
 * for more info (this sets the options part of the configuration), 
 * some options can also be set through the setData() to be specific to that dataset.
 * 
 * @param {object} options
 */
function setOptions(options) {}
 
/**
 * return legend
 */
function generateLegend() {
}

/** 
 * return image as bass64
 */
function getChartAsImage() {
}

/**
 * refresh the chart (if options updated)
 */
function refreshChart() {
}

/**
 * Clears the chart and data.
 */
function clearChart() {
}

/**
 * (re)draw the chart
 */
function drawChart() {
};
