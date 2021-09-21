angular.module('svychartjsChart', ['servoy']).directive('svychartjsChart', function($timeout, $sabloConstants) {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: "="
			},
			controller: function($scope, $element, $attrs) {

				function getColorScheme(type) {
					switch (type) {
					case 'default_color_scheme':
						return ['#5DA5DA',
						'#FAA43A',
						'#60BD68',
						'#F17CB0',
						'#B2912F',
						'#B276B2',
						'#DECF3F',
						'#F15854',
						'#4D4D4D']
						break;
					case 'facebook':
						return ['#3b5998',
						'#8b9dc3',
						'#dfe3ee',
						'#f7f7f7',
						'#ffffff',
						];
						break;
					case 'bootstrap':
						return ['#d9534f',
						'#f9f9f9',
						'#5bc0de',
						'#5cb85c',
						'#428bca',
						];
						break;
					case 'space_gray':
						return ['#343d46',
						'#4f5b66',
						'#65737e',
						'#a7adba',
						'c0c5ce',
						];
						break;
					case 'cappuccino':
						return ['#4b3832',
						'#854442',
						'#fff4e6',
						'#3c2f2f',
						'#be9b7b']
						break;
					case 'beach':
						return ['#96ceb4',
						'#ffeead',
						'#ff6f69',
						'#ffcc5c',
						'#88d8b0']
						break;
					case 'blues':
						return ['#011f4b',
						'#03396c',
						'#005b96',
						'#6497b1',
						'#b3cde0']
						break;
					case 'metro':
						return ['#d11141',
						'#00b159',
						'#00aedb',
						'#f37735',
						'#ffc425']
						break;
					case 'turquoise_shades':
						return ['#b3ecec',
						'#89ecda',
						'#43e8d8',
						'#40e0d0',
						'#3bd6c6']
						break;
					case 'retro':
						return ['#666547',
						'#fb2e01',
						'#6fcb9f',
						'#ffe28a',
						'#fffeb3']
						break;

					case 'pastel_rainbow':
						return ['#a8e6cf',
						'#dcedc1',
						'#ffd3b6',
						'#ffaaa5',
						'#ff8b94']
						break;
					case 'pwc_corp':
						return ['#dc6900',
						'#eb8c00',
						'#e0301e',
						'#a32020',
						'#602320']
						break;
					case 'sage_cream':
						return ['#bbcbdb',
						'#9ebd9e',
						'#dd855c',
						'#f1e8ca',
						'#745151']
						break;
					case 'pink_shades':
						return ['#ff00a9',
						'#fb9f9f',
						'#ff0065',
						'#ffbfd3',
						'#fb5858']
						break;
					case 'craftsman':
						return ['#d7c797',
						'#845422',
						'#ead61c',
						'#a47c48',
						'#000000']
						break;
					case 'minimal_fire':
						return ['#eec82b',
						'#d6961c',
						'#a96232',
						'#9a2511',
						'#560000']
						break;
					case 'modern_1':
						return ['#99b898',
						'#feceab',
						'#ff847c',
						'#e84a5f',
						'#2a363b']
						break;
					case 'modern_2':
						return ['#192425',
						'#d2aa6b',
						'#fd9418',
						'#475758',
						'#2b6c8c']
						break;
					case 'modern_3':
						return ['#d75c37',
						'#67727a',
						'#6991ac',
						'#c3d7df',
						'#f5f5f5']
						break;
					case 'modern_muted':
						return ['#a9b7c0',
						'#c7d8c6',
						'#efd9c1',
						'#cccbc6',
						'#aaaaaa']
						break;

					default:
						break;
					}

				}

				var className;

				var element = $element.children().first();

				function showInDesignChart() {
					if ($scope.svyServoyapi.isInDesigner()) {
						function capFirst(string) {
							return string.charAt(0).toUpperCase() + string.slice(1);
						}
						if (!$scope.model.type) {
							$scope.model.type = 'pie'
						}
						// render the chart in form editor with some mocked data
						var element = $element;
						$element.empty()
						var c = document.createElement("div");
						var t = document.createElement("h3")
						t.style.textAlign = 'center'
						var g = document.createElement("canvas");
						c.style.width = 'auto'
						c.style.height = 'auto'
						t.innerHTML = capFirst($scope.model.type) + ' Chart'
						c.appendChild(t)
						c.appendChild(g)
						element.prepend(c)

						//default color scheme if property not used
						var color_scheme = ['#5DA5DA',
							'#FAA43A',
							'#60BD68',
							'#F17CB0',
							'#B2912F',
							'#B276B2',
							'#DECF3F',
							'#F15854',
							'#4D4D4D'];

						if ($scope.model.backgroundColorScheme) {
							color_scheme = getColorScheme($scope.model.backgroundColorScheme)
						}

						var ctx = g.getContext('2d');

						if ($scope.model.type == 'scatter') {
							var options = {
								legend: false,
								tooltips: false,
								responsive: true,
								animation: {
									duration: 0
								}

							};

							var data = {
								datasets: [{
									label: "My First dataset",
									borderColor: "red",
									backgroundColor: color_scheme,
									data: [{ x: Math.random() * 100, y: Math.random() * 100 }, { x: Math.random() * 100, y: Math.random() * 100 }, { x: Math.random() * 100, y: Math.random() * 100 }, { x: Math.random() * 100, y: Math.random() * 100 }]
								}, {
									label: "My Second dataset",
									borderColor: "blue",
									backgroundColor: color_scheme,
									data: [{ x: Math.random() * 100, y: Math.random() * 100 }, { x: Math.random() * 100, y: Math.random() * 100 }, { x: Math.random() * 100, y: Math.random() * 100 }, { x: Math.random() * 100, y: Math.random() * 100 }]
								}]
							}
							new Chart(ctx, {
									type: $scope.model.type,
									data: data,
									options: options
								});
							return;
						}

						if ($scope.model.type == 'bubble') {

							var DATA_COUNT = 16;
							var MIN_XY = -150;
							var MAX_XY = 100;

							function generateData() {
								var data = [];
								var i;

								for (i = 0; i < DATA_COUNT; ++i) {
									data.push({
										x: Math.floor(Math.random() * MIN_XY) + MAX_XY,
										y: Math.floor(Math.random() * MIN_XY) + MAX_XY,
										v: Math.floor(Math.random() * 1000) + 0
									});
								}

								return data;
							}

							var data = {
								datasets: [{
									backgroundColor: color_scheme,
									data: generateData()
								}, {
									backgroundColor: color_scheme,
									data: generateData()
								}]
							};

							var options = {
								legend: false,
								tooltips: false,
								responsive: true,
								animation: {
									duration: 0
								}
							};

							new Chart(ctx, {
									type: $scope.model.type,
									data: data,
									options: options
								});
							return;
						}

						new Chart(ctx, {
								type: $scope.model.type,
								data: {
									labels: ["R", "B", "Y", "G", "P", "O"],
									datasets: [{
										label: 'Chart JS Component',
										data: [12, 19, 3, 5, 2, 3],
										backgroundColor: color_scheme,
										borderColor: $scope.model.borderColor,
										borderWidth: $scope.model.borderWidth,
										hoverBackgroundColor: $scope.model.hoverBackgroundColor,
										hoverBorderColor: $scope.model.hoverBorderColor,
										hoverBorderWidth: $scope.model.hoverBorderWidth
									}]
								},
								options: {
									legend: { display: false },
									responsive: true,
									animation: {
										duration: 0
									}
								}
							});
					}
				}

				Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
						configurable: true,
						value: function(property, value) {
							switch (property) {
							case "styleClass":
								if (className)
									element.removeClass(className);
								className = value;
								if (className)
									element.addClass(className);
								break;
							}
						}
					});

				var destroyListenerUnreg = $scope.$on("$destroy", function() {
						destroyListenerUnreg();
						delete $scope.model[$sabloConstants.modelChangeNotifier];
					});

				// data can already be here, if so call the modelChange function so
				// that it is initialized correctly.
				var modelChangFunction = $scope.model[$sabloConstants.modelChangeNotifier];
				for (key in $scope.model) {
					modelChangFunction(key, $scope.model[key]);
				}

				//if type is updated (re)draw chart
				$scope.$watch('model.type', function(newValue) {
						setupData();
						showInDesignChart()
					});

				$scope.$watch('model.backgroundColorScheme', function(newValue) {
						setupData();
						showInDesignChart()
					});

				$scope.$watch('model.foundset.serverSize', function(newValue) {
						if ($scope.model.source == 'foundset') {

							var wanted = Math.min(newValue, 10);
							if (wanted > $scope.model.foundset.viewPort.size) {
								$scope.model.foundset.loadRecordsAsync(0, wanted);
							}
							setupData();
						}
					});

				$scope.$watch('model.foundset.viewPort.size', function(newValue) {
						if ($scope.model.source == 'foundset') {

							if (newValue == 0 && $scope.model.foundset.serverSize > 0) {
								var wanted = Math.min($scope.model.foundset.serverSize, 10);
								if (wanted > $scope.model.foundset.viewPort.size) {
									$scope.model.foundset.loadRecordsAsync(0, wanted);
								}
							}
							setupData();
						}
					});

				/* draw the chart when the value in foundset changes */
				$scope.$watchCollection('model.foundset.viewPort.rows', function(newValue) {
						setupData();
					});

				var setupData = function() {
					var labels = [];

					//default color scheme if property not used
					var color_scheme = ['#5DA5DA',
						'#FAA43A',
						'#60BD68',
						'#F17CB0',
						'#B2912F',
						'#B276B2',
						'#DECF3F',
						'#F15854',
						'#4D4D4D'];

					if ($scope.model.backgroundColorScheme) {
						color_scheme = getColorScheme($scope.model.backgroundColorScheme)
					}

					var dataset = {
						label: $scope.model.legendLabel,
						backgroundColor: (typeof $scope.model.backgroundColor === 'undefined') ? color_scheme : $scope.model.backgroundColor,
						borderColor: $scope.model.borderColor,
						borderWidth: $scope.model.borderWidth,
						hoverBackgroundColor: $scope.model.hoverBackgroundColor,
						hoverBorderColor: $scope.model.hoverBorderColor,
						hoverBorderWidth: $scope.model.hoverBorderWidth,
						data: []
					};
					if (!$scope.model.foundset) return;

					//add foundset records to dataset for chart.
					var rows = $scope.model.foundset.viewPort.rows
					for (var i = 0; i < rows.length; i++) {
						var row = rows[i];
						labels.push(row.label ? row.label : row.value);
						dataset.data.push(row.value);
					}
					//update datamodel
					$scope.model.data = {
						type: $scope.model.type,
						data: { labels: labels, datasets: [dataset] }
					};
					//if we don't have any options set - use default ones;
					if (!$scope.model.options) {
						$scope.model.options = {
							responsive: true
						};
					}

				}

			},
			link: function($scope, $element, $attrs) {

				//return legend
				$scope.api.generateLegend = function() {
					if ($scope.model.chart) {
						return $scope.model.chart.generateLegend();
					}
				}

				//return image as bass64
				$scope.api.getChartAsImage = function() {
					if ($scope.model.chart) {
						return $scope.model.chart.toBase64Image();
					}
				}

				//refresh the chart (if options updated)
				$scope.api.refreshChart = function() {
					if (!$scope.model.data || !$scope.model.options) {
						return;
					}
					// update the chart if it already exists
					if ($scope.model.chart) {
						$scope.model.chart.update();
					}
				}

				$scope.api.clearChart = function() {
					if ($scope.model.chart) {
						$scope.model.chart.clear();
					}
				}

				//(re)draw the chart
				var tmp;
				var str;
				$scope.api.drawChart = function() {
					//look for function callbacks in options
					var findFnInObj = function(obj) {
						if (obj.isFunction == true) {
							var fn = "new Function ("
							for (var j = 0; j < obj.params.length; j++) {
								fn += '"' + obj.params[j] + '"';
								fn += ',';
							}
							try {
								//fix for using custom plugins server side
								var fn2 = fn.toString();
								fn2 += '"' + obj.expression + '")()';
								if (eval(fn2)) {
									return;
								}
							} catch (e) {
							}
							fn += '"' + obj.expression + '")';
							return eval(fn);
						}
						//if value found is function, re set the key value for that option
						for (var i in obj) {
							if (obj.hasOwnProperty(i) && obj[i] != null && (typeof obj[i] !== 'string')) {
								var foundFunction = findFnInObj(obj[i]);
								if (foundFunction) {
									obj[i] = foundFunction;
								}
							}
						}
						return null;
					};

					if (!$scope.model.data) {
						return;
					}

					//register plugin if it exists
					if ($scope.model.plugin) {
						findFnInObj($scope.model.plugin);
						Chart.plugins.register($scope.model.plugin)
					}

					if (!$scope.model.options) {
						$scope.model.options = { };
					}

					// destroy the chart each time
					if ($scope.model.chart) {
						$scope.model.chart.destroy();
					}

					//we need to pass a fresh node object to the chart each time we paint it as the library Chart.js
					// modifies the node object. On a second show if the node object has not changed, we pass it the same node object,
					//which this time is already once modified by the chart library and it will not draw the graph
					if (tmp !== $scope.model.data) {
						tmp = $scope.model.data;
						str = JSON.stringify($scope.model.data);
					}

					var x = JSON.parse(str);
					findFnInObj(x);
					$scope.model.options.onClick = handleClick;
					var element = document.getElementById($scope.model.svyMarkupId + '-wrapper');
					var canvas = document.getElementById($scope.model.svyMarkupId);
					if (!canvas) return;
					var ctx = canvas.getContext("2d");

					var parent = canvas.offsetParent
					canvas.width = parent ? parent.offsetWidth : 0;
					canvas.height = parent ? parent.offsetHeight : 0;

					//check if any of the options have callbacks and re-setup options object.
					findFnInObj($scope.model.options);

					// if we are not using a stylesheet make the width/height 100% to use all the space available.
					if (element.className.length == 0) {
						element.style.width = '100%';
						element.style.height = '100%';
					}
					//by default we will use responsive charts
					if (!$scope.svyServoyapi.isInAbsoluteLayout()) {
						$scope.model.options.responsive = true;
						$scope.model.options.maintainAspectRatio = false;
					}

					//disable outlabels plugins if not used
					var chrtplugins = [];
					if (!$scope.model.options.plugins) {
						$scope.model.options.plugins = { outlabels: false }
					} else {
						if ($scope.model.options.plugins.outlabels) {
							$scope.model.options.plugins.datalabels = false;
						}
						if ($scope.model.options.plugins.datalabels) {
							chrtplugins.push(ChartDataLabels)
							$scope.model.options.plugins.outlabels = false;
						}
						// support any custom inline plugins
						Object.keys($scope.model.options.plugins)
							.map(function (key) {
								if (['datalabels', 'outlabels'].indexOf(key) === -1) {
									chrtplugins.push($scope.model.options.plugins[key]);
								}
							});
					}

					$scope.model.chart = new Chart(ctx, {
							plugins:chrtplugins,
							type: x.type,
							data: x.data,
							options: $scope.model.options
						});

					if ($scope.handlers.onChartDrawn) {
						$scope.handlers.onChartDrawn();
					}
				}

				//if the data is updated (re)draw chart
				$scope.$watchCollection('model.data', function(newValue, oldValue) {
						$scope.api.drawChart();
					});

				//if the options are updated redraw the chart
				$scope.$watchCollection('model.options', function(newValue, oldValue) {
						$scope.api.refreshChart();
					});

				//if the plugin isupdated redraw the chart
				$scope.$watchCollection('model.plugin', function(newValue, oldValue) {
						$scope.api.refreshChart();
					});

				//handle click events.
				function handleClick(e) {
					try{
					var activePoints = $scope.model.chart.getElementsAtEvent(e);
					var dataset = $scope.model.chart.getDatasetAtEvent(e);					
					if (!dataset[0]) return;
					//get selected dataset index (helps distinguish between multiple datasets)
					var datasetIndex = dataset[0]._datasetIndex;					
					var selected = activePoints[datasetIndex];
					if (!selected) {
						//try the first index if we don't have the proper index
						selected = activePoints[0];
					}					
					if (!selected) return;
					var label = $scope.model.chart.data.labels[selected._index];
					var value = $scope.model.chart.data.datasets[selected._datasetIndex].data[selected._index];
					if ($scope.handlers.onClick) {
						$scope.handlers.onClick(datasetIndex, selected._index, label, value, e);
					}
					} catch(e){
//						console.log(e);
					}
				}

			},
			templateUrl: 'svychartjs/chart/chart.html'
		};
	})
