import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { ProductService } from "src/app/admin/services/product.service";
import { LookupItem } from "src/app/dto/LookupItem";
import { Invoice, InvoiceItem, Sales, SalesTax } from "src/app/dto/Payload";
import { InvoiceService } from "src/app/invoicemaster/services/invoice.service";
import { EventProxyService } from "src/app/services/event-proxy.service";
import { LookupService } from "src/app/services/lookup.service";
import { ToastService } from "src/app/utils/toast-service";

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit{
  @Input() invoice:Invoice;
  @Output() closeEvt = new EventEmitter<void>();

  invoiceItemForm:FormGroup;
  invoiceItem:InvoiceItem;
  sales:Sales;
  invoiceItemList:InvoiceItem[]=[];
  salesTaxList:SalesTax[]=[];
  inventoryList:LookupItem[];
  salesleadList:LookupItem[];

  subTotal:number;
  totalAmount:number;
  discountRate:number;
  installationFee:number;
  salesLeadId:string;

  constructor(
    private proxy:EventProxyService, private fb:FormBuilder, private toast:ToastService, 
    private productService:ProductService, private invoiceService:InvoiceService, private lookup:LookupService){}

  ngOnInit(){
    this.setupForm();
    this.invoiceItemForm.controls["unitPrice"].disable();
    this.initLookups();

    this.proxy.getEventSubject().subscribe((param: any) => {
      this.manageInvoice(param)
    });
  }

 async initLookups(){
    const result = await firstValueFrom(this.lookup.inventory());
    this.inventoryList = result.data;
    const saleslead = await firstValueFrom(this.lookup.saleslead());
    this.salesleadList = saleslead.data;
  }

  async saveAll(){
    this.sales.invoiceId = this.invoice.id;
    this.sales.salesLeadId = this.salesLeadId;
    this.sales.installationFee = this.installationFee;
    this.sales.discountRate = this.discountRate;
    this.sales.invoiceItemList = this.invoiceItemList;
    
    const result = await firstValueFrom(this.invoiceService.saveAll(this.sales));
  }

  addItem(){
    this.invoiceItem = {} as InvoiceItem;
    let inventoryId = this.invoiceItemForm.get("inventoryId")?.value;
    this.invoiceItem.quantity = this.invoiceItemForm.get("quantity")?.getRawValue();
    this.invoiceItem.unitPrice = this.invoiceItemForm.get("unitPrice")?.value;
    this.invoiceItem.description = this.invoiceItemForm.get("description")?.value;

    let productName:any;
    this.inventoryList.forEach(item => {
      if(item.id === inventoryId){
        productName = item.itemName;
      }
    });
    this.invoiceItem.inventoryId = inventoryId;
    this.invoiceItem.productName = productName;
    const exist = this.invoiceItemList.some(item => item.inventoryId === inventoryId);
    if(exist){
      this.toast.error("Product already added");
      return;
    }
    this.invoiceItemList.push(this.invoiceItem);
    this.resetForm();
  }

  async fetchPrice(evt:any){
    if(evt.value === undefined){
      this.toast.error("Error, cannot fetch price");
      return;
    }
    const result = await firstValueFrom(this.productService.getInventoryById(evt.value));
    this.invoiceItemForm.get("unitPrice")?.setValue(result.data.sellingPrice);
  }

  remove(inventoryId:string){
    const found = this.invoiceItemList.findIndex(item => item.inventoryId === inventoryId);
      if(found > -1){
        this.invoiceItemList.splice(found,1);
      }
  }

  manageInvoice(sales:Sales){
    this.sales = sales;
    this.invoiceItemList = sales.invoiceItemList;
    this.salesTaxList = sales.salesTaxList;
  }

  closePage(){
    this.closeEvt.emit();
  }

  resetForm(){
    this.invoiceItemForm.reset();
    this.invoiceItemForm.patchValue({});
    this.invoiceItemForm.get("quantity")?.setValue(1);
    this.invoiceItemForm.get("unitPrice")?.setValue(0);
  }

  setupForm(){
    this.invoiceItemForm = this.fb.group({
    id:[null],
    itemCode:[null],
    productName:[null],
    productId:[null],
    inventoryId:[null],
    quantity:[1],
    unitPrice:[0],
    subTotal:[0],
    description:[null],
    proformaInvoiceId:[null],
    });
  }
}
