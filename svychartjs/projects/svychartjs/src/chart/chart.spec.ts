import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvyChartJS } from './chart';

describe('SvyChartJS', () => {
  let component: SvyChartJS;
  let fixture: ComponentFixture<SvyChartJS>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SvyChartJS ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvyChartJS);
    component = fixture.componentInstance;
    component.servoyApi =  jasmine.createSpyObj('ServoyApi', ['getMarkupId','trustAsHtml','registerComponent','unRegisterComponent']);
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('drawChart guard (SVY-21462)', () => {

    it('does not throw when the chart directive is not yet available', () => {
      component.chart = undefined;
      expect(() => component.drawChart()).not.toThrow();
    });

    it('does not throw when the chart directive exists but its inner chart is undefined', () => {
      component.chart = {} as any;
      expect(() => component.drawChart()).not.toThrow();
    });

    it('does not invoke onChartDrawn when the chart directive is not yet available', () => {
      const onChartDrawn = jasmine.createSpy('onChartDrawn');
      component.onChartDrawn = onChartDrawn;
      component.chart = undefined;

      component.drawChart();

      expect(onChartDrawn).not.toHaveBeenCalled();
    });

    it('does not invoke onChartDrawn when the inner chart is undefined', () => {
      const onChartDrawn = jasmine.createSpy('onChartDrawn');
      component.onChartDrawn = onChartDrawn;
      component.chart = {} as any;

      component.drawChart();

      expect(onChartDrawn).not.toHaveBeenCalled();
    });

    it('renders the chart and invokes onChartDrawn when the chart is available', () => {
      const render = jasmine.createSpy('render');
      const onChartDrawn = jasmine.createSpy('onChartDrawn');
      component.chart = { chart: { render } } as any;
      component.onChartDrawn = onChartDrawn;

      component.drawChart();

      expect(render).toHaveBeenCalledTimes(1);
      expect(onChartDrawn).toHaveBeenCalledTimes(1);
    });

    it('renders the chart without error when no onChartDrawn callback is provided', () => {
      const render = jasmine.createSpy('render');
      component.chart = { chart: { render } } as any;
      component.onChartDrawn = undefined;

      expect(() => component.drawChart()).not.toThrow();
      expect(render).toHaveBeenCalledTimes(1);
    });
  });
});
