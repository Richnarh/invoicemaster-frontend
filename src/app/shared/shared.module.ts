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



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PageTitleComponent,
    PdfViewerComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports:[
    FormsModule,
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
