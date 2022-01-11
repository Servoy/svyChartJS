
import { NgModule } from '@angular/core';
import {SvyChartJS} from './chart/chart';
import { NgChartsModule } from 'ng2-charts';
 
@NgModule({
    declarations: [
        SvyChartJS
    ],
    providers: [],
    imports: [
        NgChartsModule
    ],
    exports: [ 
        SvyChartJS
      ]
})
export class SvyChartJSModule {}
