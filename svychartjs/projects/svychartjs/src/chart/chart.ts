import { Component, SimpleChanges, ViewChild, ChangeDetectionStrategy, input, model, signal, Injector, inject, afterNextRender, AfterViewInit, OnDestroy } from '@angular/core';
import { IFoundset, ServoyBaseComponent } from '@servoy/public';
import 'chart.js/auto';
import { ChartType, ChartOptions, ChartEvent, ChartDataset, Chart, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
// @ts-expect-error no types available
import outlabels from '@energiency/chartjs-plugin-piechart-outlabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import 'chartjs-adapter-luxon';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
    selector: 'svychartjs-chart',
    templateUrl: './chart.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [BaseChartDirective]
})
export class SvyChartJS extends ServoyBaseComponent<HTMLDivElement> implements AfterViewInit, OnDestroy {

    private readonly injector = inject(Injector);

    readonly chart = input<any>(undefined as any);
    readonly styleClass = input<string>(undefined as any);
    readonly backgroundColor = input<string>(undefined as any);
    readonly borderColor = input<string>(undefined as any);
    readonly borderWidth = input<number>(undefined as any);
    readonly hoverBackgroundColor = input<string>(undefined as any);
    readonly hoverBorderColor = input<string>(undefined as any);
    readonly hoverBorderWidth = input<number>(undefined as any);
    readonly backgroundColorScheme = input<string>(undefined as any);
    readonly legendLabel = input<string>(undefined as any);
    readonly type = model<ChartType>(undefined as any);
    readonly data = model<any>(undefined as any);
    readonly options = model<ChartOptions>(undefined as any);
    readonly plugin = input<any>(undefined as any);
    readonly collapseOnClick = input<boolean>(undefined as any);
    readonly foundset = input<IFoundset>(undefined as any);
    readonly responsiveHeight = input<number>(undefined as any);

    readonly onChartDrawn = input<() => void>(undefined as any);
    readonly onClick = input<(datasetIndex: number, index: number, label: string, value: number, event: Event) => void>(undefined as any);

    @ViewChild(BaseChartDirective, { static: false }) chartDirective!: BaseChartDirective;

    showCanvas = signal(false);
    canvasHeight = signal(-1);
    canvasWidth = signal(-1);

    public dataset = signal<ChartDataset[]>([{data : []}]);
    public labels = signal<string[]>([]);
    public plugins = signal<any[]>([]);

    private removeListenerFunction: (() => void) | null = null;

    svyOnInit() {
        super.svyOnInit();
        
        if (!this.options()) {
            this.options.set({
                responsive: true,
                maintainAspectRatio: false
            });
        } else {
			if (this.options().responsive === undefined) this.options.update(o => ({ ...o, responsive: true }));
			if (this.options().maintainAspectRatio === undefined) this.options.update(o => ({ ...o, maintainAspectRatio: false }));
		}
        if (this.foundset()) {
            this.removeListenerFunction = this.foundset().addChangeListener(() => {
                this.setupData();
            });

        }
        
        this.initPlugins();
    }
    
    ngAfterViewInit(): void {
        this.canvasWidth.set(this.getNativeElement().clientWidth);
        this.canvasHeight.set(this.responsiveHeight() > 0 && !this.servoyApi().isInAbsoluteLayout() ? this.responsiveHeight(): this.getNativeElement().clientHeight);
        this.showCanvas.set(true);
    }

    ngOnDestroy(): void {
        if (this.removeListenerFunction != null) {
            this.removeListenerFunction();
            this.removeListenerFunction = null;
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                switch (property) {
                    case 'styleClass':
                        if (change.previousValue) {
                            const array = change.previousValue.trim().split(' ');
                            array.filter((element: string) => element !== '').forEach((element: string) => this.renderer.removeClass(this.getNativeElement(), element));
                        }
                        if (change.currentValue) {
                            const array = change.currentValue.trim().split(' ');
                            array.filter((element: string) => element !== '').forEach((element: string) => this.renderer.addClass(this.getNativeElement(), element));
                        }
                        break;
                    case 'borderColor':
                    case 'borderWidth':
                    case 'hoverBackgroundColor':
                    case 'hoverBorderColor':
                    case 'hoverBorderWidth':
                    case 'legendLabel':
                    case 'backgroundColorScheme':
                    case 'backgroundColor':
                        this.setupData();
                        this.showInDesignChart();
                        break
                    case 'data':
                        this.setupData();
                        this.showInDesignChart();
                        if (this.onChartDrawn()) {
                            this.onChartDrawn()();
                        }
                        break;
                    case 'plugin': 
                        if (change.previousValue) {
							const currentPlugins = this.plugins();
							if (currentPlugins && currentPlugins.includes(change.previousValue)) {
								this.plugins.set(currentPlugins.filter(function (entry) {
									if ( entry == change.previousValue) {
										return false;
									}
									return true;
								}));
							}
                        }
                        if (change.currentValue) {
							const currentPlugins = this.plugins();
							if (!currentPlugins.includes(change.currentValue)) {
								this.plugins.set([...currentPlugins, change.currentValue]);
							}
                        }
                        break;
                    case 'options':
                        this.initPlugins();
                        break;
                    case 'responsiveHeight':
                        this.setHeight();
                        break;
                }
            }
        }
        super.svyOnChanges(changes);
    }
    
    setHeight() {
        if (!this.servoyApi().isInAbsoluteLayout()) {
            if (this.responsiveHeight()) {
                this.elementRef()!.nativeElement.style.height = this.responsiveHeight() + 'px';
                this.canvasHeight.set(this.responsiveHeight());
            } else {
				this.elementRef()!.nativeElement.style.height = '20px';
				this.canvasHeight.set(20);
            }
        }
    }
    
    getColorScheme(type: string): Array<string> {
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
                    '#4D4D4D'];
            case 'facebook':
                return ['#3b5998',
                    '#8b9dc3',
                    '#dfe3ee',
                    '#f7f7f7',
                    '#ffffff',
                ];
            case 'bootstrap':
                return ['#d9534f',
                    '#f9f9f9',
                    '#5bc0de',
                    '#5cb85c',
                    '#428bca',
                ];
            case 'space_gray':
                return ['#343d46',
                    '#4f5b66',
                    '#65737e',
                    '#a7adba',
                    'c0c5ce',
                ];
            case 'cappuccino':
                return ['#4b3832',
                    '#854442',
                    '#fff4e6',
                    '#3c2f2f',
                    '#be9b7b'];
            case 'beach':
                return ['#96ceb4',
                    '#ffeead',
                    '#ff6f69',
                    '#ffcc5c',
                    '#88d8b0'];
            case 'blues':
                return ['#011f4b',
                    '#03396c',
                    '#005b96',
                    '#6497b1',
                    '#b3cde0'];
            case 'metro':
                return ['#d11141',
                    '#00b159',
                    '#00aedb',
                    '#f37735',
                    '#ffc425'];
            case 'turquoise_shades':
                return ['#b3ecec',
                    '#89ecda',
                    '#43e8d8',
                    '#40e0d0',
                    '#3bd6c6'];
            case 'retro':
                return ['#666547',
                    '#fb2e01',
                    '#6fcb9f',
                    '#ffe28a',
                    '#fffeb3'];
            case 'pastel_rainbow':
                return ['#a8e6cf',
                    '#dcedc1',
                    '#ffd3b6',
                    '#ffaaa5',
                    '#ff8b94'];
            case 'pwc_corp':
                return ['#dc6900',
                    '#eb8c00',
                    '#e0301e',
                    '#a32020',
                    '#602320'];
            case 'sage_cream':
                return ['#bbcbdb',
                    '#9ebd9e',
                    '#dd855c',
                    '#f1e8ca',
                    '#745151'];
            case 'pink_shades':
                return ['#ff00a9',
                    '#fb9f9f',
                    '#ff0065',
                    '#ffbfd3',
                    '#fb5858'];
            case 'craftsman':
                return ['#d7c797',
                    '#845422',
                    '#ead61c',
                    '#a47c48',
                    '#000000'];
            case 'minimal_fire':
                return ['#eec82b',
                    '#d6961c',
                    '#a96232',
                    '#9a2511',
                    '#560000'];
            case 'modern_1':
                return ['#99b898',
                    '#feceab',
                    '#ff847c',
                    '#e84a5f',
                    '#2a363b'];
            case 'modern_2':
                return ['#192425',
                    '#d2aa6b',
                    '#fd9418',
                    '#475758',
                    '#2b6c8c'];
            case 'modern_3':
                return ['#d75c37',
                    '#67727a',
                    '#6991ac',
                    '#c3d7df',
                    '#f5f5f5'];
            case 'modern_muted':
                return ['#a9b7c0',
                    '#c7d8c6',
                    '#efd9c1',
                    '#cccbc6',
                    '#aaaaaa'];
            default:
                break;
        }
        return null as any;
    }

    setupData() {
        if (this.foundset()) {
            const newLabels: string[] = [];

            let color_scheme = ['#5DA5DA',
                '#FAA43A',
                '#60BD68',
                '#F17CB0',
                '#B2912F',
                '#B276B2',
                '#DECF3F',
                '#F15854',
                '#4D4D4D'];

            if (this.backgroundColorScheme()) {
                color_scheme = this.getColorScheme(this.backgroundColorScheme())
            }

            const newDataset: ChartDataset[] = [{
                label:this.legendLabel(),
                backgroundColor: (typeof this.backgroundColor() === 'undefined') ? color_scheme :this.backgroundColor(),
                borderColor:this.borderColor(),
                borderWidth:this.borderWidth(),
                hoverBackgroundColor:this.hoverBackgroundColor(),
                hoverBorderColor:this.hoverBorderColor(),
                hoverBorderWidth:this.hoverBorderWidth(),
                data: []
            }];
            
            for (const row of  this.foundset().viewPort.rows) {
                newLabels.push(row.label ? row.label : row.value);
                newDataset[0].data.push(row.value);
            }
            this.dataset.set(newDataset);
            this.labels.set(newLabels);
            this.data.set({
                type: this.type(),
                data: { labels: newLabels, datasets: newDataset}
            });
        } else if (this.data()) {
            this.dataset.set(this.data().data.datasets);
            this.labels.set(this.data().data.labels);
            if (this.data().type) this.type.set(this.data().type);
        }
    }

    handleClick(e: ChartEvent) {
        const activePoints = this.chartDirective?.chart?.getElementsAtEventForMode(e.native as Event,'index', { intersect: true }, false);
        const dataset = this.chartDirective?.chart?.getElementsAtEventForMode(e.native as Event,'dataset', { intersect: true }, false);
        if (!dataset?.[0]) return;
        const firstdataset = dataset[0];
        const datasetIndex = firstdataset.datasetIndex;
        const selected: any = activePoints![datasetIndex];
        if (!selected) return;
        const label = this.chartDirective.chart?.data?.labels?.[selected.index];
        const value = this.chartDirective.chart?.data?.datasets?.[selected.datasetIndex]?.data?.[selected.index];
        if (this.onClick()) {
            this.onClick()!(datasetIndex, selected._index, String(label), value as number, e.native as Event);
        }
    }

    generateLegend(): string {
        const chart = this?.chartDirective?.chart;
        if (chart && chart.legend) {
            const legend = chart.legend;
            const legendItems = legend.legendItems;
            let html = '<ul class="chart-legend">';
            for (let i = 0; i < legendItems!.length; i++) {
                const item = legendItems![i];
                html += `<li><span style="background-color:${item.fillStyle}"></span>${item.text}</li>`;
            }
            html += '</ul>';
            return html;
        }
        return null as any;
    }

    getChartAsImage(): string {
        return this.chartDirective?.chart?.toBase64Image() as string;
    }

    refreshChart() {
        if (!this.data() || !this.options()) {
            return;
        }
        if (this.chartDirective && this.chartDirective.chart) {
            this.chartDirective.chart.update();
        }
    }

    clearChart() {
        if (this.chartDirective && this.chartDirective.chart) {
            this.chartDirective.chart.clear();
        }
    }

    drawChart() {
        this.chartDirective?.chart?.render();
        if (this.onChartDrawn()) {
            this.onChartDrawn()();
        }
    }

    showInDesignChart() {
        if (this.servoyApi().isInDesigner()) {
            if (!this.type()) {
                this.type.set('pie' as ChartType);
            }

            let color_scheme = ['#5DA5DA',
                '#FAA43A',
                '#60BD68',
                '#F17CB0',
                '#B2912F',
                '#B276B2',
                '#DECF3F',
                '#F15854',
                '#4D4D4D'];

            if (this.backgroundColorScheme()) {
                color_scheme = this.getColorScheme(this.backgroundColorScheme())
            }

            if (this.type() == 'scatter') {
                const options = {
                    legend: false,
                    tooltips: false,
                    responsive: true,
                	maintainAspectRatio: false,
                    animation: {
                        duration: 0
                    }

                };

                const data = {
                    datasets: [{
                        label: 'My First dataset',
                        borderColor: 'red',
                        backgroundColor: color_scheme,
                        data: [
                            { x: Math.random() * 100, y: Math.random() * 100 },
                            { x: Math.random() * 100, y: Math.random() * 100 },
                            { x: Math.random() * 100, y: Math.random() * 100 },
                            { x: Math.random() * 100, y: Math.random() * 100 }
                        ]
                    }, {
                        label: 'My Second dataset',
                        borderColor: 'blue',
                        backgroundColor: color_scheme,
                        data: [
                            { x: Math.random() * 100, y: Math.random() * 100 },
                            { x: Math.random() * 100, y: Math.random() * 100 },
                            { x: Math.random() * 100, y: Math.random() * 100 },
                            { x: Math.random() * 100, y: Math.random() * 100 }
                        ]
                    }]
                }

                this.data.set({
                    data,
                    type: this.type()
                });
                this.options.set(options as any);
                return;
            }

            if (this.type() == 'bubble') {

                const DATA_COUNT = 16;
                const MIN_XY = -150;
                const MAX_XY = 100;

                function generateData() {
                    const data = [];

                    for (let i = 0; i < DATA_COUNT; ++i) {
                        data.push({
                            x: Math.floor(Math.random() * MIN_XY) + MAX_XY,
                            y: Math.floor(Math.random() * MIN_XY) + MAX_XY,
                            v: Math.floor(Math.random() * 1000) + 0
                        });
                    }

                    return data;
                }

                const data = {
                    datasets: [{
                        backgroundColor: color_scheme,
                        data: generateData()
                    }, {
                        backgroundColor: color_scheme,
                        data: generateData()
                    }]
                };

                const options = {
                    legend: false,
                    tooltips: false,
                    responsive: true,
                	maintainAspectRatio: false,
                    animation: {
                        duration: 0
                    }
                };

                this.data.set({
                    data,
                    type: this.type()
                });
                this.options.set(options as any);
                return;
            }

            const data = {
                labels: ['R', 'B', 'Y', 'G', 'P', 'O'],
                datasets: [{
                    label: 'Chart JS Component',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: color_scheme,
                    borderColor: this.borderColor(),
                    borderWidth: this.borderWidth(),
                    hoverBackgroundColor: this.hoverBackgroundColor(),
                    hoverBorderColor: this.hoverBorderColor(),
                    hoverBorderWidth: this.hoverBorderWidth()
                }]
            };
            this.data.set({
                data,
                type: this.type()
            });

            this.options.set({
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0
                }
            });
        }
    }
    
    private initPlugins(){
		this.showCanvas.set(false);
		if (this.type() && this.type().toString() == 'treemap'){
			Chart.register(TreemapController, TreemapElement);
            (Tooltip.positioners as any)['treemap'] = (elements: any, eventPosition: any) => {
              return {
                x: eventPosition.x,
                y: eventPosition.y
              };
            };
		}
		if (this.type() && this.type().toString() == 'funnel'){
			Chart.register(FunnelController, TrapezoidElement);
		}
        const opts = this.options();
        if (opts.plugins){
            const pluginsArray: any[] = [];
            if ((opts.plugins as any)['outlabels'])
            {
                pluginsArray.push(outlabels);
            }
            if ((opts.plugins as any)['datalabels'])
            {
                pluginsArray.push(ChartDataLabels);
            }
            if ((opts.plugins as any)['labels'])
            {
                pluginsArray.push(getChartLabelPlugin());
            }
            if ((opts.plugins as any)['annotation']) {
				Chart.register(annotationPlugin);
			}
            if ((opts.plugins as any)['customCenterTextPlugin']) {
                Chart.register({
                    id: 'customCenterTextPlugin',
                    beforeDraw(chart, args, pluginOptions) {
                        const { ctx, chartArea } = chart;
                        const centerConfig = pluginOptions as any;

                        if (!centerConfig || !centerConfig.text) return;

                        const text = centerConfig.text;
                        const fontColor = centerConfig.fontColor || '#000';
                        const fontFamily = centerConfig.fontFamily || 'Arial';
                        const fontStyle = centerConfig.fontStyle || 'normal';
                        const maxFontSize = centerConfig.maxFontSize || 256;
                        const minFontSize = centerConfig.minFontSize || 1;

                        const centerX = (chartArea.left + chartArea.right) / 2;
                        const centerY = (chartArea.top + chartArea.bottom) / 2;

                        ctx.save();
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        let fontSize = 30;
                        ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
                        let textWidth = ctx.measureText(text).width;

                        while (textWidth > chartArea.width && fontSize > minFontSize) {
                            fontSize--;
                            ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
                            textWidth = ctx.measureText(text).width;
                        }

                        fontSize = Math.min(fontSize, maxFontSize);
                        ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
                        ctx.fillStyle = fontColor;
                        ctx.fillText(text, centerX, centerY);
                        ctx.restore();
                    }
                });
            }
            if ((opts.plugins as any)['customTooltipPlugin']) {
                Chart.register({
                    id: 'customTooltipPlugin',
                    afterDatasetsDraw(chart, args, pluginOptions) {
                        const { ctx } = chart;
                        const { showLabels = false, showValues = false, labelOffset = 10, valueOffset = 10 } = pluginOptions as any;

                        if (!showLabels && !showValues) return;

                        chart.data.datasets.forEach((dataset, datasetIndex) => {
                            const meta = chart.getDatasetMeta(datasetIndex);

                            meta.data.forEach((element, index) => {
                                const label = chart.data.labels?.[index];
                                const value = dataset.data[index];
                                const centerX = element.x;
                                const centerY = element.y;

                                ctx.save();
                                ctx.font = '14px sans-serif';
                                ctx.fillStyle = 'black';
                                ctx.textAlign = 'center';

                                if (showLabels) {
                                    ctx.textBaseline = 'bottom';
                                    ctx.fillText(String(label), centerX, centerY - labelOffset);
                                }

                                if (showValues) {
                                    ctx.textBaseline = showLabels ? 'top' : 'bottom';
                                    ctx.fillText(String(value), centerX, centerY + (showLabels ? valueOffset : -6));
                                }

                                ctx.restore();
                            });
                        });
                    }
                });
            }
			if (this.plugin()) {
				pluginsArray.push(this.plugin());
			}
			
            this.plugins.set(pluginsArray);
        }
		afterNextRender(() => {
			this.showCanvas.set(true);
		}, { injector: this.injector });
    }

}
