import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { RouterModule } from "@angular/router";
import { RequestInterceptor } from "./services/request.interceptor";
import { AuthGuard } from "./services/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthGuard,DatePipe,{provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
