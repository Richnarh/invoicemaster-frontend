import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InvoicemasterLayoutComponent } from "../layouts/invoicemaster-layout/invoicemaster-layout.component";
import { ClientComponent } from "./client/client.component";
import { InvoiceComponent } from "./invoice/invoice.component";

const routes: Routes = [
  {
    path: '', component: InvoicemasterLayoutComponent,
    children: [
      { path: 'invoicemaster', component: DashboardComponent },
      { path: 'client', component: ClientComponent },
      { path: 'invoice', component: InvoiceComponent },
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicemasterRoutingModule { }
