import { Component, SimpleChanges, Input, Renderer2, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { IFoundset, ServoyBaseComponent } from '@servoy/public';
import { ChartType, ChartOptions, ChartEvent, ChartDataset, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import outlabels from "@energiency/chartjs-plugin-piechart-outlabels";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import * as Funnel from "chartjs-plugin-funnel";
import 'chartjs-adapter-luxon';

@Component({
    selector: 'svychartjs-chart',
    templateUrl: './chart.html'
})
export class SvyChartJS extends ServoyBaseComponent<HTMLDivElement> {

    @Input() styleClass: string;
    @Input() backgroundColor: string;
    @Input() borderColor: string;
    @Input() borderWidth: number;
    @Input() hoverBackgroundColor: string;
    @Input() hoverBorderColor: string;
    @Input() hoverBorderWidth: number;
    @Input() backgroundColorScheme: string;
    @Input() legendLabel: string;
    @Input() type: ChartType;
    @Input() data: any;
    @Input() options: ChartOptions;
    @Input() plugin: any;
    @Input() collapseOnClick: boolean;
    @Input() foundset: IFoundset;
    @Input() responsiveHeight: number;

    @Input() onChartDrawn: () => void;
    @Input() onClick: (datasetIndex: number, index: number, label: string, value: number, event: Event) => void;

    @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;
    @ViewChild('element', { static: true }) elementRef: ElementRef<HTMLDivElement>;
    @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
    
    showCanvas = false;
    canvasHeight = -1;
    canvasWidth = -1;

    public dataset: ChartDataset[] = [{data : []}];
    public labels: string[];
    public plugins = [];

    private removeListenerFunction: () => void;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        
        if (!this.options) {
            this.options = {
                responsive: true
            };
        }
        if (this.foundset) {
            this.removeListenerFunction = this.foundset.addChangeListener(() => {
                this.setupData();
            });

        }
        
        this.initPlugins();
        
        if (this.type && this.type.toString() == 'treemap'){
            Chart.register(TreemapController, TreemapElement);
        }
        
        if (this.type && this.type.toString() == 'funnel'){
         // it auto registers
        }
    }
    
    ngAfterViewInit(): void {
        this.canvasWidth = this.getNativeElement().clientWidth;
        this.canvasHeight= this.responsiveHeight > 0 && !this.servoyApi.isInAbsoluteLayout()? this.responsiveHeight: this.getNativeElement().clientHeight;
        this.showCanvas = true;
        this.cdRef.detectChanges();
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
                        if (this.onChartDrawn) {
                            this.onChartDrawn();
                        }
                        break;
                    case 'plugin': 
                        if (change.previousValue) {
                            // remove old one?
                        }
                        if (change.currentValue) {
                            // add it to the plugins array?
                        }
                        break;
                    case 'options':
                        this.initPlugins();
                        break;
                }
            }
        }
        super.svyOnChanges(changes);
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
        return null;
    }

    setupData() {
        if (this.foundset) {
            this.labels = [];

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

            if (this.backgroundColorScheme) {
                color_scheme = this.getColorScheme(this.backgroundColorScheme)
            }

            this.dataset =  [{data : []}];
            this.dataset[0] = {
                label:this.legendLabel,
                backgroundColor: (typeof this.backgroundColor === 'undefined') ? color_scheme :this.backgroundColor,
                borderColor:this.borderColor,
                borderWidth:this.borderWidth,
                hoverBackgroundColor:this.hoverBackgroundColor,
                hoverBorderColor:this.hoverBorderColor,
                hoverBorderWidth:this.hoverBorderWidth,
                data: []
            };            
            
            for (const row of  this.foundset.viewPort.rows) {
                this.labels.push(row.label ? row.label : row.value);
                this.dataset[0].data.push(row.value);
            }
            //update datamodel
            this.data = {
                type: this.type,
                data: { labels: this.labels, datasets: this.dataset}
            };
        } else if (this.data) {
            this.dataset = this.data.data.datasets;
            this.labels = this.data.data.labels;
            if (this.data.type) this.type = this.data.type;
        }
    }

    handleClick(e: ChartEvent) {
        const activePoints = this.chart.chart.getElementsAtEventForMode(e.native,'index', { intersect: true }, false);
        const dataset = this.chart.chart.getElementsAtEventForMode(e.native,'dataset', { intersect: true }, false);
        if (!dataset[0]) return;
        //get selected dataset index (helps distinguish between multiple datasets)
        const firstdataset = dataset[0];
        const datasetIndex = firstdataset.datasetIndex;
        const selected: any = activePoints[datasetIndex];
        if (!selected) return;
        const label = this.chart.chart.data.labels[selected.index];
        const value = this.chart.chart.data.datasets[selected.datasetIndex].data[selected.index];
        if (this.onClick) {
            this.onClick(datasetIndex, selected._index, label.toString(), value as number, e.native);
        }
    }

    generateLegend(): string {
        //TODO how can we do this in chart.js 3.x
        return null;
        //return this.chart.chart.generateLegend().toString();
    }

    getChartAsImage(): string {
        return this.chart.chart.toBase64Image();
    }

    refreshChart() {
        if (!this.data || !this.options) {
            return;
        }
        // update the chart if it already exists
        if (this.chart) {
            this.chart.chart.update();
        }
    }

    clearChart() {
        if (this.chart) {
            this.chart.chart.clear();
        }
    }

    drawChart() {
        // what to do here ?
        this.chart.chart.render();
        if (this.onChartDrawn) {
            this.onChartDrawn();
        }
    }

    showInDesignChart() {
        if (this.servoyApi.isInDesigner()) {
            if (!this.type) {
                this.type = 'pie'
            }

            //default color scheme if property not used
            let color_scheme = ['#5DA5DA',
                '#FAA43A',
                '#60BD68',
                '#F17CB0',
                '#B2912F',
                '#B276B2',
                '#DECF3F',
                '#F15854',
                '#4D4D4D'];

            if (this.backgroundColorScheme) {
                color_scheme = this.getColorScheme(this.backgroundColorScheme)
            }

            if (this.type == 'scatter') {
                let options = {
                    legend: false,
                    tooltips: false,
                    responsive: true,
                    animation: {
                        duration: 0
                    }

                };

                let data = {
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

                this.data = {
                    data,
                    type: this.type
                };
                this.options = options;
                return;
            }

            if (this.type == 'bubble') {

                var DATA_COUNT = 16;
                var MIN_XY = -150;
                var MAX_XY = 100;

                function generateData() {
                    let data = [];

                    for (let i = 0; i < DATA_COUNT; ++i) {
                        data.push({
                            x: Math.floor(Math.random() * MIN_XY) + MAX_XY,
                            y: Math.floor(Math.random() * MIN_XY) + MAX_XY,
                            v: Math.floor(Math.random() * 1000) + 0
                        });
                    }

                    return data;
                }

                let data = {
                    datasets: [{
                        backgroundColor: color_scheme,
                        data: generateData()
                    }, {
                        backgroundColor: color_scheme,
                        data: generateData()
                    }]
                };

                let options = {
                    legend: false,
                    tooltips: false,
                    responsive: true,
                    animation: {
                        duration: 0
                    }
                };

                this.data = {
                    data,
                    type: this.type
                };
                this.options = options;
                return;
            }

            let data = {
                labels: ["R", "B", "Y", "G", "P", "O"],
                datasets: [{
                    label: 'Chart JS Component',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: color_scheme,
                    borderColor: this.borderColor,
                    borderWidth: this.borderWidth,
                    hoverBackgroundColor: this.hoverBackgroundColor,
                    hoverBorderColor: this.hoverBorderColor,
                    hoverBorderWidth: this.hoverBorderWidth
                }]
            };
            this.data = {
                data,
                type: this.type
            };

            this.options = {
                //legend: { display: false },
                responsive: true,
                animation: {
                    duration: 0
                }
            };
        }
    }
    
    private initPlugins(){
        if (this.options.plugins){
            const pluginsArray = new Array();
            if (this.options.plugins['outlabels'])
            {
                pluginsArray.push(outlabels);
            }
            if (this.options.plugins['datalabels'])
            {
                pluginsArray.push(ChartDataLabels);
            }
            this.plugins = pluginsArray;
        }
    }

}

