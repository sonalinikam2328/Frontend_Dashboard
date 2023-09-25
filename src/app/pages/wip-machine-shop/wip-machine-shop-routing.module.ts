import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OilConsumptionComponent } from './oil-consumption/oil-consumption.component';
import { OilConsumptionService } from './oil-consumption/oil-consumption.service';

const routes: Routes = [
  {
    path: 'oilconsumption',
    component: OilConsumptionComponent
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WIPMachineShopRoutingModule { }
