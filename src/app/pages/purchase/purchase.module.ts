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
import { TableModule } from '@smart-webcomponents-angular/table';
import { PurchaseTonnageComponent } from './purchase-tonnage/purchase-tonnage.component'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SupplierwisePurchaseAndCRInTonsComponent,
    Top5SuppliersCRPercentComponent,
    PurchaseTonnageComponent
  ],

  imports: [
    CommonModule,
    PurchaseRoutingModule,
    UiModule,
    UIModule,
    NgApexchartsModule,
    ChartsModule,
    NgxChartistModule,
    TableModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],

})
export class PurchaseModule { }
