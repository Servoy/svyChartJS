/*!
 * chartjs-plugin-piechart-outlabels
 * http://chartjs.org/
 * Version: 0.0.8
 *
 * Copyright 2017 Neckster
 * Released under the MIT license
 * https://github.com/Neckster/chartjs-plugin-piechart-outlabels/blob/master/LICENSE
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('chart.js')) :
	typeof define === 'function' && define.amd ? define(['chart.js'], factory) :
	(factory(global.Chart));
}(this, (function (Chart) { 'use strict';

Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;

/**
 * @module Options
 */

'use strict';

var defaults = {
	LABEL_KEY: '$outlabels',
	/**
	 * The color used to draw the background of the surrounding frame.
	 * @member {String|Array|Function|null}
	 * @default null (no background)
	 */
	backgroundColor: function(context) {
		return context.dataset.backgroundColor;
	},

	/**
	 * The color used to draw the border of the surrounding frame.
	 * @member {String|Array|Function|null}
	 * @default null (no border)
	 */
	borderColor: function(context) {
		return context.dataset.backgroundColor;
	},

	lineColor: function(context) {
		return context.dataset.backgroundColor;
	},

	/**
	 * The border radius used to add rounded corners to the surrounding frame.
	 * @member {Number|Array|Function}
	 * @default 0 (not rounded)
	 */
	borderRadius: 2,

	/**
	 * The border width of the surrounding frame.
	 * @member {Number|Array|Function}
	 * @default 0 (no border)
	 */
	borderWidth: 2,

	lineWidth: 2,

	/**
	 * The color used to draw the label text.
	 * @member {String|Array|Function}
	 * @default undefined (use Chart.defaults.global.defaultFontColor)
	 */
	color: 'white',

	/**
	 * Whether to display labels global (boolean) or per data (function)
	 * @member {Boolean|Array|Function}
	 * @default true
	 */
	display: true,

	/**
	 * The font options used to draw the label text.
	 * @member {Object|Array|Function}
	 * @prop {Boolean} font.family - defaults to Chart.defaults.global.defaultFontFamily
	 * @prop {Boolean} font.size - defaults to Chart.defaults.global.defaultFontSize
	 * @prop {Boolean} font.style - defaults to Chart.defaults.global.defaultFontStyle
	 * @prop {Boolean} font.weight - defaults to 'normal'
	 * @default Chart.defaults.global.defaultFont.*
	 */
	font: {
		family: undefined,
		size: undefined,
		style: undefined,
		weight: null,
		maxSize: null,
		minSize: null,
		resizable: true,
	},

	/**
	 * The line height (in pixel) to use for multi-lines labels.
	 * @member {Number|Array|Function|undefined}
	 * @default 1.2
	 */
	lineHeight: 1.2,


	/**
	 * The padding (in pixels) to apply between the text and the surrounding frame.
	 * @member {Number|Object|Array|Function}
	 * @prop {Number} padding.top - Space above the text.
	 * @prop {Number} padding.right - Space on the right of the text.
	 * @prop {Number} padding.bottom - Space below the text.
	 * @prop {Number} padding.left - Space on the left of the text.
	 * @default 4 (all values)
	 */
	padding: {
		top: 4,
		right: 4,
		bottom: 4,
		left: 4
	},

	/**
	 * Text alignment for multi-lines labels ('left'|'right'|'start'|'center'|'end').
	 * @member {String|Array|Function}
	 * @default 'start'
	 */
	textAlign: 'center',

	stretch: 40,

	text: '%l %p'
};

'use strict';

var positioners = {
	center: function(arc, pos, stretch) {
		var angle = (arc.startAngle + arc.endAngle) / 2;
		var cosA = Math.cos(angle);
		var sinA = Math.sin(angle);
		var d = arc.outerRadius;

		// if (pos === 'in') {
		// 	d = arc.innerRadius + (arc.outerRadius - arc.innerRadius) / 2;
		// }

		var stretchedD = d + stretch;
		return {
			x: arc.x + cosA * stretchedD,
			y: arc.y + sinA * stretchedD,
			d: stretchedD,
			arc: arc,
			anchor: {
				x: arc.x + cosA * d,
				y: arc.y + sinA * d,
			},
			copy: {
				x: arc.x + cosA * stretchedD,
				y: arc.y + sinA * stretchedD
			}
		};
	},

	moveFromAnchor: function(center, dist) {
		var arc = center.arc;
		var d = center.d;
		var angle = (arc.startAngle + arc.endAngle) / 2;
		var cosA = Math.cos(angle);
		var sinA = Math.sin(angle);

		d += dist;

		return {
			x: arc.x + cosA * d,
			y: arc.y + sinA * d,
			d: d,
			arc: arc,
			anchor: center.anchor,
			copy: {
				x: arc.x + cosA * d,
				y: arc.y + sinA * d
			}
		};
	}
};

'use strict';

var helpers = Chart.helpers;
var LABEL_KEY$1 = defaults.LABEL_KEY;

var classes = {
	OutLabel: function(el, index, ctx, config, context) {
		var resolve = Chart.helpers.options.resolve;
		// Check whether the label should be displayed
		if (!resolve([config.display, true], context, index)) {
			delete this;
			return null;
		}
		// Init text
		var value = context.dataset.data[index];
		var label = context.labels[index];
		var text = helpers.valueOrDefault(config.text, '%v %p');
		text = text.replace(/%l/gi, label);
		text = text.replace(/%v/gi, value);
		text = text.replace(/%p/gi, (context.percent * 100).toFixed(1) + '%');

		// Count lines
		var lines = text.match(/[^\r\n]+/g);

		// If no lines => nothng to display
		if (!lines || !lines.length) {
			return null;
		}

		// Remove unnecessary spaces
		for (var i = 0; i < lines.length; ++i) {
			lines[i] = lines[i].trim();
		}

		/* ===================== CONSTRUCTOR ==================== */
		this.init = function(text, lines) {
			// If everything ok -> begin initializing
			this.encodedText = config.text;
			this.text = text;
			this.lines = lines;
			this.label = label;
			this.value = value;
			this.ctx = ctx;

			// Init style
			this.style = {
				backgroundColor: resolve([config.backgroundColor, defaults.backgroundColor, 'black'], context, index),
				borderColor: resolve([config.borderColor, defaults.borderColor, 'black'], context, index),
				borderRadius: resolve([config.borderRadius, 0], context, index),
				borderWidth: resolve([config.borderWidth, 0], context, index),
				lineWidth: resolve([config.lineWidth, 2], context, index),
				lineColor: resolve([config.lineColor, defaults.lineColor, 'black'], context, index),
				color: resolve([config.color, 'white'], context, index),
				font: helpers.parseFont(resolve([config.font, {resizable: true}])),
				padding: helpers.options.toPadding(resolve([config.padding, 0], context, index)),
				textAlign: resolve([config.textAlign, 'left'], context, index),
			};

			this.stretch = resolve([config.stretch, 40], context, index);
			this.size = helpers.textSize(ctx, this.lines, this.style.font);

			this.offsetStep = this.size.width / 20;
			this.offset = {
				x: 0,
				y: 0
			};
			this.predictedOffset = this.offset;

			var angle = -((el._model.startAngle + el._model.endAngle) / 2) / (Math.PI);
			var val = Math.abs(angle - Math.trunc(angle));

			if (val > 0.45 && val < 0.55) {
				this.predictedOffset.x = 0;
			} else if (angle <= 0.45 && angle >= -0.45) {
				this.predictedOffset.x = this.size.width / 2;
			} else if (angle >= -1.45 && angle <= -0.55) {
				this.predictedOffset.x = -this.size.width / 2;
			}
		};

		this.init(text, lines);

		/* COMPUTING RECTS PART */
		this.computeLabelRect = function() {
			var width = this.textRect.width + 2 * this.style.borderWidth;
			var height = this.textRect.height + 2 * this.style.borderWidth;

			var x = this.textRect.x - this.style.padding.left - this.style.borderWidth;
			var y = this.textRect.y - this.style.padding.top - this.style.borderWidth;

			width += this.style.padding.width;
			height += this.style.padding.height;

			return {
				x: x,
				y: y,
				width: width,
				height: height
			};
		};

		this.computeTextRect = function() {
			return {
				x: this.center.x - (this.size.width / 2),
				y: this.center.y - (this.size.height / 2),
				width: this.size.width,
				height: this.size.height
			};
		};

		this.getPoints = function() {
			return [
				{
					x: this.labelRect.x,
					y: this.labelRect.y
				},
				{
					x: this.labelRect.x + this.labelRect.width,
					y: this.labelRect.y
				},
				{
					x: this.labelRect.x + this.labelRect.width,
					y: this.labelRect.y + this.labelRect.height
				},
				{
					x: this.labelRect.x,
					y: this.labelRect.y + this.labelRect.height
				}
			];
		};

		this.containsPoint = function(point, offset) {
			if (!offset) {
				offset = 5;
			}

			return	this.labelRect.x - offset <= point.x && point.x <= this.labelRect.x + this.labelRect.width + offset
							&&
						this.labelRect.y - offset <= point.y && point.y <= this.labelRect.y + this.labelRect.height + offset;
		};


		/* ======================= DRAWING ======================= */
		// Draw label text
		this.drawText = function() {
			var align = this.style.textAlign;
			var font = this.style.font;
			var lh = font.lineHeight;
			var color = this.style.color;
			var ilen = this.lines.length;
			var x, y, idx;

			if (!ilen || !color) {
				return;
			}

			x = this.textRect.x;
			y = this.textRect.y + lh / 2;

			if (align === 'center') {
				x += this.textRect.width / 2;
			} else if (align === 'end' || align === 'right') {
				x += this.textRect.width;
			}

			this.ctx.font = this.style.font.string;
			this.ctx.fillStyle = color;
			this.ctx.textAlign = align;
			this.ctx.textBaseline = 'middle';

			for (idx = 0; idx < ilen; ++idx) {
				this.ctx.fillText(
					this.lines[idx],
					Math.round(x),
					Math.round(y),
					Math.round(this.textRect.width)
				);

				y += lh;
			}
		};

		// Draw label box
		this.drawLabel = function() {
			ctx.beginPath();
			helpers.canvas.roundedRect(
				this.ctx,
				Math.round(this.labelRect.x),
				Math.round(this.labelRect.y),
				Math.round(this.labelRect.width),
				Math.round(this.labelRect.height),
				this.style.borderRadius
			);
			this.ctx.closePath();

			if (this.style.backgroundColor) {
				this.ctx.fillStyle = this.style.backgroundColor || 'black';
				this.ctx.fill();
			}

			if (this.style.borderColor && this.style.borderWidth) {
				this.ctx.strokeStyle = this.style.borderColor;
				this.ctx.lineWidth = this.style.borderWidth;
				this.ctx.lineJoin = 'miter';
				this.ctx.stroke();
			}
		};


		this.drawLine = function() {
			this.ctx.save();

			this.ctx.strokeStyle = this.style.lineColor;
			this.ctx.lineWidth = this.style.lineWidth;
			this.ctx.lineJoin = 'miter';
			this.ctx.beginPath();
			this.ctx.moveTo(this.center.anchor.x, this.center.anchor.y);
			this.ctx.lineTo(this.center.copy.x, this.center.copy.y);
			this.ctx.stroke();

			this.ctx.restore();
		};

		this.draw = function() {
			this.drawLabel();
			this.drawText();
		};


		this.update = function(view, elements, max) {
			this.center = positioners.center(view, 'out', this.stretch);
			this.moveLabelToOffset();

			this.center.x += this.offset.x;
			this.center.y += this.offset.y;

			var valid = false;

			while (!valid) {
				this.textRect = this.computeTextRect();
				this.labelRect = this.computeLabelRect();
				var rectPoints = this.getPoints();

				valid = true;

				for (var e = 0; e < max; ++e) {
					var element = elements[e][LABEL_KEY$1];
					if (!element) {
						continue;
					}

					var elPoints = element.getPoints();

					for (var p = 0; p < rectPoints.length; ++p) {
						if (element.containsPoint(rectPoints[p])) {
							valid = false;
							break;
						}

						if(this.containsPoint(elPoints[p])) {
							valid = false;
							break;
						}
					}
				}

				if (!valid) {
					this.center = positioners.moveFromAnchor(this.center, 1);
					this.center.x += this.offset.x;
					this.center.y += this.offset.y;
				}
			}
		};

		this.moveLabelToOffset = function() {
			if (this.predictedOffset.x <= 0 && this.offset.x > this.predictedOffset.x) {
				this.offset.x -= this.offsetStep;
				if (this.offset.x <= this.predictedOffset.x) {
					this.offset.x = this.predictedOffset.x;
				}
			} else if (this.predictedOffset.x >= 0 && this.offset.x < this.predictedOffset.x) {
				this.offset.x += this.offsetStep;
				if (this.offset.x >= this.predictedOffset.x) {
					this.offset.x = this.predictedOffset.x;
				}
			}
		};
	}
};

'use strict';

var helpers$1 = Chart.helpers;

var helpers$2 = helpers$1.merge(helpers$1, {
	// @todo move this method in Chart.helpers.canvas.toFont (deprecates helpers.fontString)
	// @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
	toFontString: function(font) {
		if (!font || helpers$1.isNullOrUndef(font.size) || helpers$1.isNullOrUndef(font.family)) {
			return null;
		}

		return (font.style ? font.style + ' ' : '')
			+ (font.weight ? font.weight + ' ' : '')
			+ font.size + 'px '
			+ font.family;
	},

	// @todo move this in Chart.helpers.canvas.textSize
	// @todo cache calls of measureText if font doesn't change?!
	textSize: function(ctx, lines, font) {
		var items = [].concat(lines);
		var ilen = items.length;
		var prev = ctx.font;
		var width = 0;
		var i;

		ctx.font = font.string;

		for (i = 0; i < ilen; ++i) {
			width = Math.max(ctx.measureText(items[i]).width, width);
		}

		ctx.font = prev;

		return {
			height: ilen * font.lineHeight,
			width: width
		};
	},

	// @todo move this method in Chart.helpers.options.toFont
	parseFont: function(value) {
		var global = Chart.defaults.global;
		var size = helpers$1.valueOrDefault(value.size, global.defaultFontSize);
		var font = {
			family: helpers$1.valueOrDefault(value.family, global.defaultFontFamily),
			lineHeight: helpers$1.options.toLineHeight(value.lineHeight, size),
			size: size,
			style: helpers$1.valueOrDefault(value.style, global.defaultFontStyle),
			weight: helpers$1.valueOrDefault(value.weight, null),
			string: ''
		};

		font.string = helpers$1.toFontString(font);
		return font;
	},

	isEmptyObj: function(obj) {
		for (var x in obj) {
			if (x) {
				return false;
			}
		}
		return true;
	}
});

'use strict';

Chart.defaults.outlabeledPie = Chart.defaults.doughnut;

var custom = Chart.controllers.doughnut.extend({
	update: function(reset) {
		var me = this;
		var chart = me.chart;
		var chartArea = chart.chartArea;
		var opts = chart.options;
		var arcOpts = opts.elements.arc;
		var availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth;
		var availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth;
		var minSize = Math.min(availableWidth, availableHeight);
		var offset = {x: 0, y: 0};
		var meta = me.getMeta();
		var cutoutPercentage = opts.cutoutPercentage;
		var circumference = opts.circumference;

		// If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
		if (circumference < Math.PI * 2.0) {
			var startAngle = opts.rotation % (Math.PI * 2.0);
			startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
			var endAngle = startAngle + circumference;
			var start = {x: Math.cos(startAngle), y: Math.sin(startAngle)};
			var end = {x: Math.cos(endAngle), y: Math.sin(endAngle)};
			var contains0 = (startAngle <= 0 && endAngle >= 0) || (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
			var contains90 = (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
			var contains180 = (startAngle <= -Math.PI && -Math.PI <= endAngle) || (startAngle <= Math.PI && Math.PI <= endAngle);
			var contains270 = (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
			var cutout = cutoutPercentage / 100.0;
			var min = {x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)), y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout))};
			var max = {x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)), y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout))};
			var size = {width: (max.x - min.x) * 0.5, height: (max.y - min.y) * 0.5};
			minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
			offset = {x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5};
		}

		chart.borderWidth = me.getMaxBorderWidth(meta.data);
		chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
		chart.innerRadius = Math.max(cutoutPercentage ? (chart.outerRadius / 100) * (cutoutPercentage) : 0, 0);
		chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
		chart.offsetX = offset.x * chart.outerRadius;
		chart.offsetY = offset.y * chart.outerRadius;

		meta.total = me.calculateTotal();

		me.outerRadius = chart.outerRadius - (chart.radiusLength * me.getRingIndex(me.index));
		me.innerRadius = Math.max(me.outerRadius - chart.radiusLength, 0);

		me.outerRadius *= 0.50;
		me.innerRadius *= 0.50;

		Chart.helpers.each(meta.data, function(arc, index) {
			me.updateElement(arc, index, reset);
		});
	}
});

Chart.controllers.outlabeledPie = custom;


Chart.defaults.global.plugins.outlabels = defaults;

var LABEL_KEY = defaults.LABEL_KEY;


function configure(dataset, options) {
	var override = dataset.outlabels;
	var config = {};

	if (override === false) {
		return null;
	}
	if (override === true) {
		override = {};
	}

	return helpers$2.merge(config, [options, override]);
}

Chart.plugins.register({
	id: 'outlabels',

	resize: function(chart, size, options) {
		if (options.font.resizable) {
			options.font.size = (size.height / 100) * 2.5;
			if(options.font.minSize && options.font.size < options.font.minSize) {
				options.font.size = options.font.minSize;
			}
			if(options.font.maxSize && options.font.size > options.font.maxSize) {
				options.font.size = options.font.maxSize;
			}
			options.font.changed = true;
		}
	},
	afterInit: function(chart, options) {
		var size = chart.canvas.style;
		if (options.font.resizable) {
			options.font.size = (size.height.slice(0, -2) / 100) * 2.5;
			if(options.font.minSize && options.font.size < options.font.minSize) {
				options.font.size = options.font.minSize;
			}
			if(options.font.maxSize && options.font.size > options.font.maxSize) {
				options.font.size = options.font.maxSize;
			}
		}
		if (options.font.size === 0 ) options.font.size = null;
	},
	afterDatasetUpdate: function(chart, args, options) {
		var labels = chart.config.data.labels;
		var dataset = chart.data.datasets[args.index];
		var config = configure(dataset, options);
		var display = config && config.display;
		var elements = args.meta.data || [];
		var ctx = chart.ctx;
		var el, label, percent, newLabel;

		ctx.save();

		for (var i = 0; i < elements.length; ++i) {
			el = elements[i];
			label = el[LABEL_KEY];
			percent = dataset.data[i] / args.meta.total;

			newLabel = (display && el && !el.hidden) ? new classes.OutLabel(
				el,
				i,
				ctx,
				config,
				{
					chart: chart,
					dataIndex: i,
					dataset: dataset,
					labels: labels,
					datasetIndex: args.index,
					percent: percent
				}
			) : null;

			newLabel = !helpers$2.isEmptyObj(newLabel) ? newLabel : null;

			if (label && newLabel && !options.font.changed && (label.label === newLabel.label) && (label.encodedText === newLabel.encodedText)) {
				newLabel.offset = label.offset;
			}

			el[LABEL_KEY] = newLabel;
		}

		ctx.restore();

		if (options.font.changed) {
			options.font.changed = false;
		}
	},
	afterDatasetDraw: function(chart, args) {
		var elements = args.meta.data || [];
		var ctx = chart.ctx;
		var el, label, index;

		for (var i = 0; i < 2 * elements.length; ++i) {
			index = i < elements.length ? i : i - elements.length;

			el = elements[index];
			label = el[LABEL_KEY];
			if (!label) {
				continue;
			}

			if (i < elements.length) {
				label.update(el._view, elements, i);
				label.drawLine(ctx);
			} else {
				label.draw(ctx);
			}
		}
	}
});

})));
