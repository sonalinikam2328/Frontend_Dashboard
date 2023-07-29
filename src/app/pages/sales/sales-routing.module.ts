import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCollectionPlanComponent } from './payment-collection-plan/payment-collection-plan.component';
import { TurnOverComponent } from './turn-over/turn-over.component';


const routes: Routes = [
  {
    path: 'paymentCollectionPlan',
    component: PaymentCollectionPlanComponent
  },
  {
    path: 'turnOver',
    component: TurnOverComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {

}
