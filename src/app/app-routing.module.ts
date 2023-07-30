import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: '', loadChildren: () => import('./invoicemaster/invoicemaster.module').then(m => m.InvoicemasterModule)},
  { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivateChild:[AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
