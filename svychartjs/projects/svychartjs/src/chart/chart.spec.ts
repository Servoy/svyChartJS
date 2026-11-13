import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';

import { SvyChartJS } from './chart';

/**
 * These tests exercise OUR component logic (config/option building, dataset/label
 * mapping from a Servoy foundset, svyOnChanges dispatch, public API methods and the
 * plugin wiring). chart.js is NOT rendered: jsdom has no canvas getContext, so the
 * <canvas baseChart> is never created and chartDirective stays undefined. Where a
 * method depends on the live chart we inject a hand-rolled fake chartDirective so we
 * assert OUR glue code, never chart.js internals.
 */
describe('SvyChartJS', () => {
    let component: SvyChartJS;
    let fixture: ComponentFixture<SvyChartJS>;
    let servoyApi: ServoyApiTesting;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(SvyChartJS);
        component = fixture.componentInstance;
        servoyApi = new ServoyApiTesting();
        fixture.componentRef.setInput('servoyApi', servoyApi);
        for (const [key, value] of Object.entries(overrides)) {
            if (value !== undefined) {
                fixture.componentRef.setInput(key, value);
            }
        }
        fixture.detectChanges();
        await fixture.whenStable();
    }

    // Build a SimpleChanges object and feed it straight to svyOnChanges, like the
    // framework would after an @Input change.
    function fireChanges(changes: Record<string, { previous?: any; current?: any; first?: boolean }>) {
        const sc: SimpleChanges = {};
        for (const [prop, c] of Object.entries(changes)) {
            sc[prop] = new SimpleChange(c.previous, c.current, c.first ?? false);
        }
        component.svyOnChanges(sc);
    }

    // Minimal fake of the ng2-charts BaseChartDirective + its chart.js chart.
    function makeFakeChartDirective(chartOverrides: any = {}) {
        const chart = {
            update: vi.fn(),
            clear: vi.fn(),
            render: vi.fn(),
            toBase64Image: vi.fn(() => 'data:image/png;base64,FAKE'),
            getElementsAtEventForMode: vi.fn(),
            data: { labels: [], datasets: [] },
            legend: undefined,
            ...chartOverrides
        };
        return { chart } as any;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyPublicTestingModule, SvyChartJS],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    describe('svyOnInit / defaults', () => {
        it('sets a default options object (responsive, no aspect ratio) when none is given', () => {
            expect(component.options()).toEqual({ responsive: true, maintainAspectRatio: false });
        });

        it('fills missing responsive/maintainAspectRatio on a provided options object', async () => {
            await createComponent({ options: { animation: { duration: 0 } } });
            const opts: any = component.options();
            expect(opts.responsive).toBe(true);
            expect(opts.maintainAspectRatio).toBe(false);
            expect(opts.animation).toEqual({ duration: 0 });
        });

        it('leaves responsive/maintainAspectRatio untouched when already supplied', async () => {
            await createComponent({ options: { responsive: false, maintainAspectRatio: true } });
            const opts: any = component.options();
            expect(opts.responsive).toBe(false);
            expect(opts.maintainAspectRatio).toBe(true);
        });

        it('registers a foundset change listener and tears it down on destroy', async () => {
            const removeFn = vi.fn();
            const addChangeListener = vi.fn(() => removeFn);
            const foundset: any = { viewPort: { rows: [] }, addChangeListener };
            await createComponent({ foundset });
            expect(addChangeListener).toHaveBeenCalled();
            fixture.destroy();
            expect(removeFn).toHaveBeenCalled();
        });

        it('rebuilds data when the foundset notifies a change', async () => {
            let listener: (() => void) | undefined;
            const foundset: any = {
                viewPort: { rows: [{ label: 'a', value: 1 }, { label: 'b', value: 2 }] },
                addChangeListener: (fn: () => void) => { listener = fn; return () => undefined; }
            };
            await createComponent({ foundset, type: 'bar' });
            // simulate the foundset firing a change
            listener!();
            expect(component.labels()).toEqual(['a', 'b']);
            expect(component.dataset()[0].data).toEqual([1, 2]);
        });

        it('ngOnDestroy is safe when there is no foundset listener', () => {
            expect(() => component.ngOnDestroy()).not.toThrow();
        });
    });

    describe('getColorScheme', () => {
        it('returns the default scheme with nine colors', () => {
            const scheme = component.getColorScheme('default_color_scheme');
            expect(scheme).toHaveLength(9);
            expect(scheme[0]).toBe('#5DA5DA');
        });

        it.each([
            ['facebook', '#3b5998'],
            ['bootstrap', '#d9534f'],
            ['space_gray', '#343d46'],
            ['cappuccino', '#4b3832'],
            ['beach', '#96ceb4'],
            ['blues', '#011f4b'],
            ['metro', '#d11141'],
            ['turquoise_shades', '#b3ecec'],
            ['retro', '#666547'],
            ['pastel_rainbow', '#a8e6cf'],
            ['pwc_corp', '#dc6900'],
            ['sage_cream', '#bbcbdb'],
            ['pink_shades', '#ff00a9'],
            ['craftsman', '#d7c797'],
            ['minimal_fire', '#eec82b'],
            ['modern_1', '#99b898'],
            ['modern_2', '#192425'],
            ['modern_3', '#d75c37'],
            ['modern_muted', '#a9b7c0']
        ])('returns the %s scheme starting with %s', (name, first) => {
            const scheme = component.getColorScheme(name);
            expect(scheme[0]).toBe(first);
            expect(scheme.length).toBeGreaterThan(0);
        });

        it('returns null for an unknown scheme', () => {
            expect(component.getColorScheme('does_not_exist')).toBeNull();
        });
    });

    describe('setupData from a foundset', () => {
        function foundsetWith(rows: any[]) {
            return { viewPort: { rows }, addChangeListener: () => () => undefined } as any;
        }

        it('maps rows to labels/dataset and builds the data model', async () => {
            await createComponent({
                foundset: foundsetWith([{ label: 'Jan', value: 10 }, { label: 'Feb', value: 20 }]),
                legendLabel: 'Sales',
                type: 'bar'
            });
            component.setupData();
            expect(component.labels()).toEqual(['Jan', 'Feb']);
            expect(component.dataset()[0].data).toEqual([10, 20]);
            expect(component.dataset()[0].label).toBe('Sales');
            const data: any = component.data();
            expect(data.type).toBe('bar');
            expect(data.data.labels).toEqual(['Jan', 'Feb']);
        });

        it('falls back to the value when a row has no label', async () => {
            await createComponent({ foundset: foundsetWith([{ value: 42 }]) });
            component.setupData();
            expect(component.labels()).toEqual([42]);
        });

        it('uses the default color scheme when no backgroundColor is set', async () => {
            await createComponent({ foundset: foundsetWith([{ label: 'x', value: 1 }]) });
            component.setupData();
            expect(component.dataset()[0].backgroundColor).toEqual(expect.arrayContaining(['#5DA5DA']));
        });

        it('honours an explicit background color scheme', async () => {
            await createComponent({
                foundset: foundsetWith([{ label: 'x', value: 1 }]),
                backgroundColorScheme: 'facebook'
            });
            component.setupData();
            expect((component.dataset()[0].backgroundColor as string[])[0]).toBe('#3b5998');
        });

        it('uses an explicit backgroundColor over the scheme', async () => {
            await createComponent({
                foundset: foundsetWith([{ label: 'x', value: 1 }]),
                backgroundColor: '#123456'
            });
            component.setupData();
            expect(component.dataset()[0].backgroundColor).toBe('#123456');
        });
    });

    describe('setupData from the data input', () => {
        it('reads datasets/labels from the data model and picks up the type', async () => {
            await createComponent({
                data: { type: 'line', data: { labels: ['a', 'b'], datasets: [{ data: [1, 2] }] } }
            });
            component.setupData();
            expect(component.labels()).toEqual(['a', 'b']);
            expect(component.dataset()).toEqual([{ data: [1, 2] }]);
            expect(component.type()).toBe('line');
        });

        it('does not overwrite the type when the data model has none', async () => {
            await createComponent({
                type: 'doughnut',
                data: { data: { labels: ['a'], datasets: [{ data: [1] }] } }
            });
            component.setupData();
            expect(component.type()).toBe('doughnut');
        });
    });

    describe('svyOnChanges dispatch', () => {
        it('adds style classes on the native element', () => {
            fireChanges({ styleClass: { current: 'foo bar' } });
            const el = component.getNativeElement();
            expect(el.classList.contains('foo')).toBe(true);
            expect(el.classList.contains('bar')).toBe(true);
        });

        it('removes previous style classes and adds the new ones', () => {
            fireChanges({ styleClass: { current: 'old' } });
            expect(component.getNativeElement().classList.contains('old')).toBe(true);
            fireChanges({ styleClass: { previous: 'old', current: 'new' } });
            const el = component.getNativeElement();
            expect(el.classList.contains('old')).toBe(false);
            expect(el.classList.contains('new')).toBe(true);
        });

        it('rebuilds data on a styling property change', async () => {
            const foundset: any = { viewPort: { rows: [{ label: 'a', value: 5 }] }, addChangeListener: () => () => undefined };
            await createComponent({ foundset });
            fireChanges({ backgroundColor: { current: '#fff' } });
            expect(component.labels()).toEqual(['a']);
        });

        it('calls onChartDrawn when the data property changes', async () => {
            const onChartDrawn = vi.fn();
            await createComponent({
                onChartDrawn,
                data: { type: 'bar', data: { labels: ['a'], datasets: [{ data: [1] }] } }
            });
            fireChanges({ data: { current: component.data() } });
            expect(onChartDrawn).toHaveBeenCalled();
        });

        it('adds a plugin on change and avoids duplicates', () => {
            const pluginA = { id: 'a' };
            fireChanges({ plugin: { current: pluginA } });
            expect(component.plugins()).toContain(pluginA);
            // firing the same plugin again should not duplicate it
            fireChanges({ plugin: { current: pluginA } });
            expect(component.plugins().filter(p => p === pluginA)).toHaveLength(1);
        });

        it('removes a previously added plugin on change', () => {
            const pluginA = { id: 'a' };
            fireChanges({ plugin: { current: pluginA } });
            expect(component.plugins()).toContain(pluginA);
            fireChanges({ plugin: { previous: pluginA, current: undefined } });
            expect(component.plugins()).not.toContain(pluginA);
        });

        it('re-initialises plugins on an options change', () => {
            fireChanges({ options: { current: { responsive: true } } });
            // initPlugins toggles showCanvas off before re-render scheduling
            expect(component.showCanvas()).toBe(false);
        });

        it('adjusts the height on a responsiveHeight change', () => {
            const setHeight = vi.spyOn(component, 'setHeight');
            fireChanges({ responsiveHeight: { current: 300 } });
            expect(setHeight).toHaveBeenCalled();
        });

    });

    describe('setHeight', () => {
        it('applies responsiveHeight to the element and canvas height', async () => {
            vi.spyOn(servoyApi, 'isInAbsoluteLayout').mockReturnValue(false);
            await createComponent({ responsiveHeight: 250 });
            vi.spyOn(component.servoyApi(), 'isInAbsoluteLayout').mockReturnValue(false);
            component.setHeight();
            expect(component.elementRef()!.nativeElement.style.height).toBe('250px');
            expect(component.canvasHeight()).toBe(250);
        });

        it('falls back to 20px when no responsiveHeight is set', () => {
            vi.spyOn(component.servoyApi(), 'isInAbsoluteLayout').mockReturnValue(false);
            component.setHeight();
            expect(component.elementRef()!.nativeElement.style.height).toBe('20px');
            expect(component.canvasHeight()).toBe(20);
        });

        it('does nothing in absolute layout', () => {
            vi.spyOn(component.servoyApi(), 'isInAbsoluteLayout').mockReturnValue(true);
            component.canvasHeight.set(-1);
            component.setHeight();
            expect(component.canvasHeight()).toBe(-1);
        });
    });

    describe('public API methods', () => {
        it('getChartAsImage returns the base64 image from the chart', () => {
            component.chartDirective = makeFakeChartDirective();
            expect(component.getChartAsImage()).toBe('data:image/png;base64,FAKE');
        });

        it('getChartAsImage is undefined when there is no chart', () => {
            expect(component.getChartAsImage()).toBeUndefined();
        });

        it('refreshChart updates the chart when data and options exist', async () => {
            await createComponent({ data: { type: 'bar', data: { labels: [], datasets: [] } } });
            const dir = makeFakeChartDirective();
            component.chartDirective = dir;
            component.refreshChart();
            expect(dir.chart.update).toHaveBeenCalled();
        });

        it('refreshChart does nothing without data', () => {
            const dir = makeFakeChartDirective();
            component.chartDirective = dir;
            // default fixture has no data input
            component.refreshChart();
            expect(dir.chart.update).not.toHaveBeenCalled();
        });

        it('clearChart clears the chart when present', () => {
            const dir = makeFakeChartDirective();
            component.chartDirective = dir;
            component.clearChart();
            expect(dir.chart.clear).toHaveBeenCalled();
        });

        it('clearChart is safe when there is no chart', () => {
            expect(() => component.clearChart()).not.toThrow();
        });

        it('drawChart renders the chart and calls onChartDrawn', async () => {
            const onChartDrawn = vi.fn();
            await createComponent({ onChartDrawn });
            const dir = makeFakeChartDirective();
            component.chartDirective = dir;
            component.drawChart();
            expect(dir.chart.render).toHaveBeenCalled();
            expect(onChartDrawn).toHaveBeenCalled();
        });

        it('drawChart is safe without a chart or handler', () => {
            expect(() => component.drawChart()).not.toThrow();
        });
    });

    describe('generateLegend', () => {
        it('returns null when there is no chart legend', () => {
            component.chartDirective = makeFakeChartDirective();
            expect(component.generateLegend()).toBeNull();
        });

        it('builds an html legend from the chart legend items', () => {
            component.chartDirective = makeFakeChartDirective({
                legend: { legendItems: [{ fillStyle: '#f00', text: 'Red' }, { fillStyle: '#0f0', text: 'Green' }] }
            });
            const html = component.generateLegend();
            expect(html).toContain('<ul class="chart-legend">');
            expect(html).toContain('background-color:#f00');
            expect(html).toContain('Red');
            expect(html).toContain('Green');
        });

        it('returns null when there is no chart at all', () => {
            expect(component.generateLegend()).toBeNull();
        });
    });

    describe('handleClick', () => {
        it('does nothing when there is no dataset element', () => {
            const onClick = vi.fn();
            component.chartDirective = makeFakeChartDirective({ getElementsAtEventForMode: vi.fn(() => []) });
            fixture.componentRef.setInput('onClick', onClick);
            component.handleClick({ native: new MouseEvent('click') } as any);
            expect(onClick).not.toHaveBeenCalled();
        });

        it('invokes onClick with mapped label/value when a point is active', async () => {
            const onClick = vi.fn();
            await createComponent({ onClick });
            const chart = {
                data: { labels: ['Jan', 'Feb'], datasets: [{ data: [10, 20] }] },
                getElementsAtEventForMode: vi.fn()
            };
            // first call => index mode (active points), second => dataset mode
            chart.getElementsAtEventForMode
                .mockReturnValueOnce([{ index: 1, datasetIndex: 0, _index: 1 }])
                .mockReturnValueOnce([{ datasetIndex: 0 }]);
            component.chartDirective = { chart } as any;
            component.handleClick({ native: new MouseEvent('click') } as any);
            expect(onClick).toHaveBeenCalledWith(0, 1, 'Feb', 20, expect.any(Event));
        });

        it('does nothing when the active point for the dataset index is missing', async () => {
            const onClick = vi.fn();
            await createComponent({ onClick });
            const chart = {
                data: { labels: ['Jan'], datasets: [{ data: [10] }] },
                getElementsAtEventForMode: vi.fn()
            };
            chart.getElementsAtEventForMode
                .mockReturnValueOnce([]) // active points empty
                .mockReturnValueOnce([{ datasetIndex: 0 }]);
            component.chartDirective = { chart } as any;
            component.handleClick({ native: new MouseEvent('click') } as any);
            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe('showInDesignChart', () => {
        it('does nothing when not in the designer', () => {
            vi.spyOn(component.servoyApi(), 'isInDesigner').mockReturnValue(false);
            component.showInDesignChart();
            // no data set for a non-designer run
            expect(component.data()).toBeUndefined();
        });

        it('builds default pie sample data in the designer', () => {
            vi.spyOn(component.servoyApi(), 'isInDesigner').mockReturnValue(true);
            component.showInDesignChart();
            expect(component.type()).toBe('pie');
            const data: any = component.data();
            expect(data.data.labels).toEqual(['R', 'B', 'Y', 'G', 'P', 'O']);
            expect(data.data.datasets[0].data).toEqual([12, 19, 3, 5, 2, 3]);
        });

        it('builds scatter sample data in the designer', async () => {
            await createComponent({ type: 'scatter' });
            vi.spyOn(component.servoyApi(), 'isInDesigner').mockReturnValue(true);
            component.showInDesignChart();
            const data: any = component.data();
            expect(data.type).toBe('scatter');
            expect(data.data.datasets).toHaveLength(2);
            expect(data.data.datasets[0].data[0]).toHaveProperty('x');
        });

        it('builds bubble sample data in the designer', async () => {
            await createComponent({ type: 'bubble' });
            vi.spyOn(component.servoyApi(), 'isInDesigner').mockReturnValue(true);
            component.showInDesignChart();
            const data: any = component.data();
            expect(data.type).toBe('bubble');
            expect(data.data.datasets[0].data[0]).toHaveProperty('v');
        });

        it('applies a chosen color scheme to the designer sample', async () => {
            await createComponent({ type: 'pie', backgroundColorScheme: 'metro' });
            vi.spyOn(component.servoyApi(), 'isInDesigner').mockReturnValue(true);
            component.showInDesignChart();
            const data: any = component.data();
            expect(data.data.datasets[0].backgroundColor[0]).toBe('#d11141');
        });
    });

    describe('plugin wiring (initPlugins via options change)', () => {
        // initPlugins reads the options() signal (not change.currentValue), so we set
        // the options input first, then fire the change to trigger initPlugins.
        async function withPlugins(plugins: any) {
            await createComponent({ options: { plugins } });
            fireChanges({ options: { current: { plugins } } });
        }

        it('turns on datalabels plugin when options enable it', async () => {
            await withPlugins({ datalabels: {} });
            expect(component.plugins().length).toBeGreaterThan(0);
        });

        it('turns on outlabels plugin when options enable it', async () => {
            await withPlugins({ outlabels: {} });
            expect(component.plugins().length).toBeGreaterThan(0);
        });

        it('turns on labels plugin when options enable it', async () => {
            await withPlugins({ labels: {} });
            expect(component.plugins().length).toBeGreaterThan(0);
        });

        it('registers the annotation plugin without adding to the plugins array', async () => {
            await withPlugins({ annotation: {} });
            expect(component.plugins()).toEqual([]);
        });

        it('registers the custom center-text plugin', async () => {
            await expect(withPlugins({ customCenterTextPlugin: { text: 'hi' } })).resolves.not.toThrow();
        });

        it('registers the custom tooltip plugin', async () => {
            await expect(withPlugins({ customTooltipPlugin: { showLabels: true } })).resolves.not.toThrow();
        });

        it('appends the configured plugin input to the plugins array', async () => {
            const plugin = { id: 'myPlugin' };
            await createComponent({ plugin, options: { plugins: { datalabels: {} } } });
            fireChanges({ options: { current: { plugins: { datalabels: {} } } } });
            expect(component.plugins()).toContain(plugin);
        });

        it('registers the treemap controller for a treemap chart', async () => {
            await createComponent({ type: 'treemap', options: { plugins: {} } });
            expect(() => fireChanges({ options: { current: { plugins: {} } } })).not.toThrow();
        });

        it('registers the funnel controller for a funnel chart', async () => {
            await createComponent({ type: 'funnel', options: { plugins: {} } });
            expect(() => fireChanges({ options: { current: { plugins: {} } } })).not.toThrow();
        });
    });
});
