import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';

import { Top5SuppliersCRPercentComponent } from './top5-suppliers-cr-percent/top5-suppliers-cr-percent.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { NgxEchartsModule } from 'ngx-echarts';
import { UiModule } from '../ui/ui.module';

import { SupplierwisePurchaseAndCRInTonsComponent } from './supplierwise-purchase-and-cr-in-tons/supplierwise-purchase-and-cr-in-tons.component';
import { UIModule } from '../../shared/ui/ui.module';
// import { CheckBoxModule } from 'smart-webcomponents-angular/checkbox';
import { TableModule} from '@smart-webcomponents-angular/table'



@NgModule({
  declarations: [
    SupplierwisePurchaseAndCRInTonsComponent,
    
    Top5SuppliersCRPercentComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    UiModule,
    UIModule,
    NgApexchartsModule,
    ChartsModule,
    NgxChartistModule,
    TableModule
  ]
})
export class PurchaseModule { }
