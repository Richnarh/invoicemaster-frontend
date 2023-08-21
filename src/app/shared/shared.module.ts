import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BlockUIModule } from "ng-block-ui";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PopoverModule } from "ngx-bootstrap/popover";
import { TooltipModule  } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { PageTitleComponent } from "./page-title/page-title.component";
import { SafePipe } from "./pipes/SafePipe";
import { PdfViewerComponent } from "./pdf-viewer/pdf-viewer.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { FilterPipe } from "./pipes/filterPipe";
import { NodataComponent } from './nodata/nodata.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PageTitleComponent,
    PdfViewerComponent,
    SafePipe,
    FilterPipe,
    UserLoginComponent,
    NodataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    PopoverModule,
    TooltipModule,
    BsDatepickerModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  exports:[
    FormsModule,
    BlockUIModule,
    PopoverModule,
    TooltipModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    SidebarComponent,
    HeaderComponent, 
    FooterComponent,
    PageTitleComponent,
    PdfViewerComponent,
    NodataComponent,
    SafePipe,
    FilterPipe
  ]
})
export class SharedModule { }
