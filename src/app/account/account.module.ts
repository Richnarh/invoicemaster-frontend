import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ChatOfAccountComponent } from './chat-of-account/chat-of-account.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { BankTransactionComponent } from './bank-transaction/bank-transaction.component';
import { BillComponent } from './bill/bill.component';
import { JournalComponent } from './journal/journal.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseItemComponent } from './expense-item/expense-item.component';
import { AccountLayoutComponent } from "../layouts/account-layout/account-layout.component";
import { SharedModule } from "../shared/shared.module";
import { ComponentsModule } from "../components/components.module";


@NgModule({
  declarations: [
    AccountLayoutComponent,
    ChatOfAccountComponent,
    AccountDashboardComponent,
    BankTransactionComponent,
    BillComponent,
    JournalComponent,
    ExpenseComponent,
    ExpenseItemComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class AccountModule { }
