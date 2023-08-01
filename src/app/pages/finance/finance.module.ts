import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { NgxEchartsModule } from 'ngx-echarts';
import { UIModule } from '../../shared/ui/ui.module';


import { FinanceRoutingModule } from './finance-routing.module';
import { CustomerReceivableChartComponent } from './customer-receivable-chart/customer-receivable-chart.component';
import { TableModule} from '@smart-webcomponents-angular/table'


@NgModule({
  declarations: [
    CustomerReceivableChartComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    UIModule,
    NgApexchartsModule,
    ChartsModule,
    NgxChartistModule,
    TableModule
  ],  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class FinanceModule { }
