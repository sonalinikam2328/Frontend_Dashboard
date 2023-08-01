import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierwisePurchaseAndCRInTonsComponent } from './supplierwise-purchase-and-cr-in-tons/supplierwise-purchase-and-cr-in-tons.component';

const routes: Routes = [
  {
    path: 'Supplierwise purchase and CR in Tons',
    component: SupplierwisePurchaseAndCRInTonsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
