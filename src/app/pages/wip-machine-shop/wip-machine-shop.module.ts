import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WIPMachineShopRoutingModule } from './wip-machine-shop-routing.module';
import { OilConsumptionComponent } from './oil-consumption/oil-consumption.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { NgxEchartsModule } from 'ngx-echarts';
import { UiModule } from '../ui/ui.module';


import { UIModule } from '../../shared/ui/ui.module';
// import { CheckBoxModule } from 'smart-webcomponents-angular/checkbox';
import { TableModule } from '@smart-webcomponents-angular/table';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// const routes: Routes = [
//   {
//     path: 'top5supplierscrpercentcomponent',
//     component: OilConsumptionComponent
//   }
// ]

@NgModule({
  declarations: [
    OilConsumptionComponent
  ],
  imports: [
    CommonModule,
    WIPMachineShopRoutingModule,
    NgSelectModule,
    
    CommonModule,
    
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
export class WIPMachineShopModule { }
