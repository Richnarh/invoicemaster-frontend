import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { Invoice, InvoiceItem } from "src/app/dto/Payload";
import { InvoiceService } from "src/app/invoicemaster/services/invoice.service";
import { LookupService } from "src/app/services/lookup.service";

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit{
  @Input() invoice:Invoice;

  invoiceItemForm:FormGroup;
  invoiceItem:InvoiceItem;
  inventoryList:LookupItem[];

  constructor(private fb:FormBuilder, private invoiceService:InvoiceService, private lookup:LookupService){}
  ngOnInit(){
    this.setupForm();
    this.initLookups();
  }

 async initLookups(){
    const result = await firstValueFrom(this.lookup.inventory());
    this.inventoryList = result.data;
  }

  closePage(){

  }

  setupForm(){
    this.invoiceItemForm = this.fb.group({

    });
  }
}
