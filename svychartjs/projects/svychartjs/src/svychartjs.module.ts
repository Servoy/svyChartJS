
import { NgModule } from '@angular/core';
import {SvyChartJS} from './chart/chart';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
 
@NgModule({
    imports: [
        SvyChartJS
    ],
    providers: [
        provideCharts(withDefaultRegisterables())
    ],
    exports: [ 
        SvyChartJS
      ]
})
export class SvyChartJSModule {}
