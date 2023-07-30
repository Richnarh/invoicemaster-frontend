import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { WelcomeLayoutComponent } from "../layouts/welcome-layout/welcome-layout.component";
import { AuthGuard } from "../services/auth.guard";

const routes: Routes = [
  {
    path: 'a', component: WelcomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'index', component: IndexComponent},
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
