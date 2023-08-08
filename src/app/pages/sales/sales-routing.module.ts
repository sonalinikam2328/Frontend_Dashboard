import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCollectionPlanComponent } from './payment-collection-plan/payment-collection-plan.component';
import { TurnOverComponent } from './turn-over/turn-over.component';
import { DevelopmentCostDetailsComponent } from './development-cost-details/development-cost-details.component';
import { DailySalesDataComponent } from './daily-sales-data/daily-sales-data.component';
import { MonthlySalesAndTargetComponent } from './monthly-sales-and-target/monthly-sales-and-target.component';
import { CustomerWisePlanVsActualSaleComponent } from './customer-wise-plan-vs.-actual-sale/customer-wise-plan-vs.-actual-sale.component';

const routes: Routes = [
  {
    path: 'paymentCollectionPlan',
    component: PaymentCollectionPlanComponent
  },
  {
    path: 'turnOver',
    component: TurnOverComponent
  },
  {
    path: 'developmentcostdeatils',
    component: DevelopmentCostDetailsComponent
  },
  {
    path: 'dailysalesdata',
    component: DailySalesDataComponent
  },
  {
    path: 'monthlysalesandtarget',
    component: MonthlySalesAndTargetComponent
  },
  {
    path: 'customerwiseplanvs.actualsale',
    component: CustomerWisePlanVsActualSaleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {

}
