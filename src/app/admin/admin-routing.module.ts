import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from "./administration/administration.component";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { CompanyBranchComponent } from "./company-branch/company-branch.component";
import { CompanyProfileComponent } from "./company-profile/company-profile.component";
import { EmployeesComponent } from "./employees/employees.component";
import { ReverseInvoiceComponent } from "./reverse-invoice/reverse-invoice.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { ProductComponent } from "./product/product.component";
import { ProductTypeComponent } from "./product-type/product-type.component";
import { SaleleadComponent } from "./salelead/salelead.component";
import { AppconfigComponent } from "./appconfig/appconfig.component";
import { SalesLogComponent } from "./sales-log/sales-log.component";
import { GroupContactComponent } from "./sms/group-contact/group-contact.component";
import { MessageTemplateComponent } from "./sms/message-template/message-template.component";
import { SingleMessageComponent } from "./sms/single-message/single-message.component";
import { BulkMessageComponent } from "./sms/bulk-message/bulk-message.component";
import { SmsGroupComponent } from "./sms/sms-group/sms-group.component";
import { PermissionsComponent } from "./permissions/permissions.component";


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: 'admin', component: AdministrationComponent },
      { path: 'branch', component: CompanyBranchComponent },
      { path: 'profile', component: CompanyProfileComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'reverse', component: ReverseInvoiceComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product-type', component: ProductTypeComponent },
      { path: 'saleslead', component: SaleleadComponent },
      { path: 'appconfig', component: AppconfigComponent },
      { path: 'saleslog', component: SalesLogComponent },
      { path: 'permissions', component: PermissionsComponent },

      { path: 'message-template', component: MessageTemplateComponent },
      { path: 'group-contact', component: GroupContactComponent },
      { path: 'single-message', component: SingleMessageComponent },
      { path: 'bulk-message', component: BulkMessageComponent },
      { path: 'sms-group', component: SmsGroupComponent },
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
