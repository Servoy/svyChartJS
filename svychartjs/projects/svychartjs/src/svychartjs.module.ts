
import { NgModule } from '@angular/core';
import {SvyChartJS} from './chart/chart';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
 
@NgModule({
    declarations: [
        SvyChartJS
    ],
    providers: [],
    imports: [
        NgChartsModule,
        CommonModule 
    ],
    exports: [ 
        SvyChartJS
      ]
})
export class SvyChartJSModule {}
