import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { AdministrationComponent } from './administration/administration.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { SharedModule } from "../shared/shared.module";
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { CompanyBranchComponent } from './company-branch/company-branch.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    PaymentComponent,
    AdministrationComponent,
    TransactionComponent,
    PaymentStatusComponent,
    CompanyBranchComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
