import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { LoginComponent } from './account/auth/login/login.component';
import { SupplierWiseBoringRecoveryDetailsComponent } from './pages/subcontract/supplier-wise-boring-recovery-details/supplier-wise-boring-recovery-details.component';
import { PaymentCollectionPlanComponent } from './pages/sales/payment-collection-plan/payment-collection-plan.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule) },
  { path: 'crypto-ico-landing', component: CyptolandingComponent },

  { path: '**', component: LoginComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
