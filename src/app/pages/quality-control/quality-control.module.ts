import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerWiseComplaintsReceivedComponent } from './customer-wise-complaints-received/customer-wise-complaints-received.component';
import { QualityControlRoutingModule } from './quality-control-routing.module';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { NgxEchartsModule } from 'ngx-echarts';

import { UIModule } from '../../shared/ui/ui.module';
@NgModule({
  declarations: [CustomerWiseComplaintsReceivedComponent],
  imports: [
    CommonModule,
    QualityControlRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    ChartsModule,
    UIModule,
    NgxChartistModule,
    NgxEchartsModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class QualityControlModule { }
