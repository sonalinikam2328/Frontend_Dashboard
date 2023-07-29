import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { NgxEchartsModule } from 'ngx-echarts';
import { UIModule } from '../../shared/ui/ui.module';

import { SalesRoutingModule } from './sales-routing.module';
import { PaymentCollectionPlanComponent } from './payment-collection-plan/payment-collection-plan.component';
import { TurnOverComponent } from './turn-over/turn-over.component';
// import { CheckBoxModule } from 'smart-webcomponents-angular/checkbox';
import { TableModule} from '@smart-webcomponents-angular/table'


@NgModule({
  declarations: [
    PaymentCollectionPlanComponent,
    TurnOverComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    UIModule,
    NgApexchartsModule,
    ChartsModule,
    NgxChartistModule,
    TableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SalesModule { }
