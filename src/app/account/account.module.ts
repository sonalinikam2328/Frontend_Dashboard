import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { TableModule } from '@smart-webcomponents-angular/table'


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    TableModule
  ]
})
export class AccountModule { }
