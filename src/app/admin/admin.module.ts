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
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReverseInvoiceComponent } from './reverse-invoice/reverse-invoice.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductComponent } from './product/product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { SaleleadComponent } from './salelead/salelead.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    PaymentComponent,
    AdministrationComponent,
    TransactionComponent,
    PaymentStatusComponent,
    CompanyBranchComponent,
    CompanyProfileComponent,
    EmployeesComponent,
    ReverseInvoiceComponent,
    ChangePasswordComponent,
    InventoryComponent,
    ProductComponent,
    ProductTypeComponent,
    SaleleadComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
