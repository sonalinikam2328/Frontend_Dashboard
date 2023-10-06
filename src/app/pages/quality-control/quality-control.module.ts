import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerWiseComplaintsReceivedComponent } from './customer-wise-complaints-received/customer-wise-complaints-received.component';
import { QualityControlRoutingModule } from './quality-control-routing.module';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [CustomerWiseComplaintsReceivedComponent],
  imports: [
    CommonModule,
    QualityControlRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class QualityControlModule { }
