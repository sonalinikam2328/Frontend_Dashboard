import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { NgxEchartsModule } from 'ngx-echarts';
import { UiModule } from '../ui/ui.module';

import { TableModule } from '@smart-webcomponents-angular/table';
import { SupplierwisePurchaseAndCRInTonsComponent } from './supplierwise-purchase-and-cr-in-tons/supplierwise-purchase-and-cr-in-tons.component';


@NgModule({
  declarations: [
    SupplierwisePurchaseAndCRInTonsComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    UiModule,
    NgApexchartsModule,
    ChartsModule,
    NgxChartistModule,
    TableModule
  ]
})
export class PurchaseModule { }
