import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PageTitleComponent } from "./page-title/page-title.component";
import { SafePipe } from "./pipes/SafePipe";
import { PdfViewerComponent } from "./pdf-viewer/pdf-viewer.component";
import { BlockUIModule } from "ng-block-ui";
import { UserLoginComponent } from "./user-login/user-login.component";



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PageTitleComponent,
    PdfViewerComponent,
    SafePipe,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BlockUIModule.forRoot()
  ],
  exports:[
    FormsModule,
    BlockUIModule,
    ReactiveFormsModule,
    SidebarComponent,
    HeaderComponent, 
    FooterComponent,
    PageTitleComponent,
    PdfViewerComponent,
    SafePipe
  ]
})
export class SharedModule { }
