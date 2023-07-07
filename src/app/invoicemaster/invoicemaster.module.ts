import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicemasterRoutingModule } from './invoicemaster-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { InvoicemasterLayoutComponent } from "../layouts/invoicemaster-layout/invoicemaster-layout.component";


@NgModule({
  declarations: [
    InvoicemasterLayoutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    InvoicemasterRoutingModule,
    SharedModule
  ]
})
export class InvoicemasterModule { }
