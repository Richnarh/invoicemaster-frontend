import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from "./administration/administration.component";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { TransactionComponent } from "./transaction/transaction.component";


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: 'admin', component: AdministrationComponent },
      { path: 'transaction', component: TransactionComponent },
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
