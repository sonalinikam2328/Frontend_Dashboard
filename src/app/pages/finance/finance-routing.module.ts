import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReceivableChartComponent } from './customer-receivable-chart/customer-receivable-chart.component';

const routes: Routes = [
  {
    path: 'customerreceivablechart',
    component: CustomerReceivableChartComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
