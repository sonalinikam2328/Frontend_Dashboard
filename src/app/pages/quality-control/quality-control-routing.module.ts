import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerWiseComplaintsReceivedComponent } from './customer-wise-complaints-received/customer-wise-complaints-received.component';
const routes: Routes = [
  {
    path: 'customerwisecomplaintsreceived',
    component:CustomerWiseComplaintsReceivedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityControlRoutingModule { }
