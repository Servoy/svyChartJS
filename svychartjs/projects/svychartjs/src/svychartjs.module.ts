
import { NgModule } from '@angular/core';
import {SvyChartJS} from './chart/chart';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
 
@NgModule({
    declarations: [
        SvyChartJS
    ],
    providers: [],
    imports: [
        BaseChartDirective,
        CommonModule 
    ],
    exports: [ 
        SvyChartJS
      ]
})
export class SvyChartJSModule {}
