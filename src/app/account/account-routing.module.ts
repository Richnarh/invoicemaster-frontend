import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from "../layouts/account-layout/account-layout.component";
import { ChatOfAccountComponent } from "./chat-of-account/chat-of-account.component";
import { AccountDashboardComponent } from "./account-dashboard/account-dashboard.component";

const routes: Routes = [
  {
    path: '', component: AccountLayoutComponent,
    children: [
      { path: 'accounts', component: AccountDashboardComponent },
      { path: 'chat-of-account', component: ChatOfAccountComponent },
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
