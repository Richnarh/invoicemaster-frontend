import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InvoicemasterLayoutComponent } from "../layouts/invoicemaster-layout/invoicemaster-layout.component";
import { ClientComponent } from "./client/client.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { InvoiceSaleComponent } from "./invoice-sale/invoice-sale.component";

const routes: Routes = [
  {
    path: 'i', component: InvoicemasterLayoutComponent,
    children: [
      { path: 'invoicemaster', component: DashboardComponent },
      { path: 'client', component: ClientComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'invoice-sales', component: InvoiceSaleComponent },
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicemasterRoutingModule { }
