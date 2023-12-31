import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicemasterRoutingModule } from './invoicemaster-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { InvoicemasterLayoutComponent } from "../layouts/invoicemaster-layout/invoicemaster-layout.component";
import { InvoiceComponent } from './invoice/invoice.component';
import { ClientComponent } from './client/client.component';
import { InvoiceItemComponent } from './invoice-item/invoice-item.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { ComponentsModule } from "../components/components.module";


@NgModule({
    declarations: [
        InvoicemasterLayoutComponent,
        DashboardComponent,
        InvoiceComponent,
        ClientComponent,
        InvoiceItemComponent,
        AddClientComponent,
        AddPaymentComponent
    ],
    imports: [
        CommonModule,
        InvoicemasterRoutingModule,
        SharedModule,
        ComponentsModule
    ]
})
export class InvoicemasterModule { }
