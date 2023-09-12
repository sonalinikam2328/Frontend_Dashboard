import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierWiseBoringRecoveryDetailsComponent } from './supplier-wise-boring-recovery-details/supplier-wise-boring-recovery-details.component';

const routes: Routes = [
  {
    path: 'supplierwiseboringrecoverydetails',
    component: SupplierWiseBoringRecoveryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcontractRoutingModule { }
