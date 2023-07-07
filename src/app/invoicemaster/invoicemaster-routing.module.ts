import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InvoicemasterLayoutComponent } from "../layouts/invoicemaster-layout/invoicemaster-layout.component";

const routes: Routes = [
  {
    path: 'i', component: InvoicemasterLayoutComponent,
    children: [
      { path: 'invoicemaster', component: DashboardComponent },
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicemasterRoutingModule { }
