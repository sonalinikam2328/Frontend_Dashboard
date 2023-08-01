import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCollectionPlanComponent } from './payment-collection-plan/payment-collection-plan.component';
import { TurnOverComponent } from './turn-over/turn-over.component';
import { DevelopmentCostDetailsComponent } from './development-cost-details/development-cost-details.component';

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
    component:DevelopmentCostDetailsComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {

}
