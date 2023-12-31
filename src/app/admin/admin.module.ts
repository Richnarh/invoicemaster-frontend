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
import { AppconfigComponent } from './appconfig/appconfig.component';
import { SalesLogComponent } from './sales-log/sales-log.component';
import { ComponentsModule } from "../components/components.module";
import { PermissionsComponent } from './permissions/permissions.component';
import { TaxManagementComponent } from './tax-management/tax-management.component';
import { GroupContactComponent } from "./sms/group-contact/group-contact.component";
import { MessageTemplateComponent } from "./sms/message-template/message-template.component";
import { SingleMessageComponent } from "./sms/single-message/single-message.component";
import { BulkMessageComponent } from './sms/bulk-message/bulk-message.component';
import { SmsGroupComponent } from './sms/sms-group/sms-group.component';
import { GroupFormComponent } from './sms/group-form/group-form.component';
import { MessageFormComponent } from './sms/message-form/message-form.component';
import { TaxComponent } from './tax/tax.component';


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
    AppconfigComponent,
    SalesLogComponent,
    PermissionsComponent,
    TaxManagementComponent,
    TaxComponent,

    SingleMessageComponent,
    MessageTemplateComponent,
    GroupContactComponent,
    BulkMessageComponent,
    SmsGroupComponent,
    GroupFormComponent,
    MessageFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class AdminModule { }
