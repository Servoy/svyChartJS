import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { SvyChartJS } from './chart';

describe('SvyChartJS', () => {
  let component: SvyChartJS;
  let fixture: ComponentFixture<SvyChartJS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvyChartJS]
    }).compileComponents();

    fixture = TestBed.createComponent(SvyChartJS);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('servoyApi', {
      getMarkupId: vi.fn(),
      trustAsHtml: vi.fn(),
      registerComponent: vi.fn(),
      unRegisterComponent: vi.fn()
    });
    fixture.detectChanges();
  });

  it.skip('should create', () => {
    expect(component).toBeTruthy();
  });
});
