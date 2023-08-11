import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { NgxEchartsModule } from 'ngx-echarts';
import { UIModule } from '../../shared/ui/ui.module';

import { SalesRoutingModule } from './sales-routing.module';
import { PaymentCollectionPlanComponent } from './payment-collection-plan/payment-collection-plan.component';
import { TurnOverComponent } from './turn-over/turn-over.component';
// import { CheckBoxModule } from 'smart-webcomponents-angular/checkbox';
import { TableModule} from '@smart-webcomponents-angular/table';
import { DevelopmentCostDetailsComponent } from './development-cost-details/development-cost-details.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DailySalesDataComponent } from './daily-sales-data/daily-sales-data.component';
import { MonthlySalesAndTargetComponent } from './monthly-sales-and-target/monthly-sales-and-target.component';
import { CustomerWisePlanVsActualSaleComponent } from './customer-wise-plan-vs.-actual-sale/customer-wise-plan-vs.-actual-sale.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MonthlyValueAdditionTargetVsActualComponent } from './monthly-value-addition-target-vs-actual/monthly-value-addition-target-vs-actual.component';
import { ScheduleAdherenceForTheMonthComponent } from './schedule-adherence-for-the-month/schedule-adherence-for-the-month.component';


@NgModule({
  declarations: [
    PaymentCollectionPlanComponent,
    TurnOverComponent,
    DevelopmentCostDetailsComponent,
<<<<<<< Updated upstream
    DailySalesDataComponent,
    MonthlySalesAndTargetComponent,
    CustomerWisePlanVsActualSaleComponent
=======
    
    MonthlyValueAdditionTargetVsActualComponent,
          ScheduleAdherenceForTheMonthComponent
>>>>>>> Stashed changes
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    UIModule,
    NgApexchartsModule,
    ChartsModule,
    NgxChartistModule,
    TableModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
<<<<<<< Updated upstream
=======
    BsDatepickerModule,
>>>>>>> Stashed changes
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SalesModule { }
