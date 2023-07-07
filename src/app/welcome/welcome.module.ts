import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from "../shared/shared.module";
import { WelcomeLayoutComponent } from "../layouts/welcome-layout/welcome-layout.component";


@NgModule({
  declarations: [
    WelcomeLayoutComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule
  ]
})
export class WelcomeModule { }
