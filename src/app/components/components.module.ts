import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewButtonComponent } from "./add-new-button/add-new-button.component";
import { CloseButtonComponent } from './close-button/close-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { ClearButtonComponent } from './clear-button/clear-button.component';
import { SearchButtonComponent } from './search-button/search-button.component';


@NgModule({
  declarations: [
    AddNewButtonComponent,
    CloseButtonComponent,
    SaveButtonComponent,
    ClearButtonComponent,
    SearchButtonComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AddNewButtonComponent,
    CloseButtonComponent,
    SaveButtonComponent,
    ClearButtonComponent,
    SearchButtonComponent
  ]
})
export class ComponentsModule { }
