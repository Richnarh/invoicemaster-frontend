import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from "./administration/administration.component";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { CompanyBranchComponent } from "./company-branch/company-branch.component";
import { CompanyProfileComponent } from "./company-profile/company-profile.component";
import { EmployeesComponent } from "./employees/employees.component";


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: 'admin', component: AdministrationComponent },
      { path: 'branch', component: CompanyBranchComponent },
      { path: 'profile', component: CompanyProfileComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'transaction', component: TransactionComponent },
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
