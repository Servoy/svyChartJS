
import { NgModule } from '@angular/core';
import {SvyChartJS} from './chart/chart';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CommonModule } from '@angular/common';
 
@NgModule({
    declarations: [
        SvyChartJS
    ],
    providers: [
        provideCharts(withDefaultRegisterables())
    ],
    imports: [
        BaseChartDirective,
        CommonModule 
    ],
    exports: [ 
        SvyChartJS
      ]
})
export class SvyChartJSModule {}
