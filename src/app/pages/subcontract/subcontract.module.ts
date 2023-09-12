import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SubcontractRoutingModule } from './subcontract-routing.module';
import { SupplierWiseBoringRecoveryDetailsComponent } from './supplier-wise-boring-recovery-details/supplier-wise-boring-recovery-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { UIModule } from '../../shared/ui/ui.module';
import { TableModule } from '@smart-webcomponents-angular/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [
    SupplierWiseBoringRecoveryDetailsComponent
  ],
  imports: [
    CommonModule,
    SubcontractRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    
    UIModule,
    NgApexchartsModule,
    ChartsModule,
    NgxChartistModule,
    TableModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    BsDatepickerModule,
    ReactiveFormsModule
  ]
})
export class SubcontractModule { }
