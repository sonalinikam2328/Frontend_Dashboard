import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierwisePurchaseAndCRInTonsComponent } from './supplierwise-purchase-and-cr-in-tons/supplierwise-purchase-and-cr-in-tons.component';
import { Top5SuppliersCRPercentComponent } from './top5-suppliers-cr-percent/top5-suppliers-cr-percent.component';
import { PurchaseTonnageComponent } from './purchase-tonnage/purchase-tonnage.component'
const routes: Routes = [
  {
    path: 'top5supplierscrpercentcomponent',
    component: Top5SuppliersCRPercentComponent
  },
  {
    path: 'SupplierwisepurchaseandCRinTons',
    component: SupplierwisePurchaseAndCRInTonsComponent
  },
  {
    path: 'PurchaseTonnage',
    component: PurchaseTonnageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
