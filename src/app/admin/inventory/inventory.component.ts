import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first, firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { Inventory } from "src/app/dto/Payload";
import { LookupService } from "src/app/services/lookup.service";
import { PageView } from "src/app/utils/page-view";
import { ProductService } from "../services/product.service";
import { SweetMessage } from "src/app/utils/sweet-message";
import { ToastService } from "src/app/utils/toast-service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  pageTitle:string = "Inventory";
  pageView:PageView = PageView.listView();

  inventoryForm:FormGroup;
  inventoryList:Inventory[];
  products:LookupItem[];

  pageSize = 10;
  page = 1;

  constructor(private fb:FormBuilder, private lookup:LookupService, private productService:ProductService,private toast:ToastService){}

  ngOnInit(){
    this.setupForm();
    this.initLookups();
    this.fetchInventory();
  }

  initInventory(){
    this.inventoryForm.reset();
    this.inventoryForm.patchValue({});
    this.pageView.resetToCreateView();
  }

  async initLookups(){
    const product = await firstValueFrom(this.lookup.products());
    this.products = product.data;
  }

  async fetchInventory(){
    const result = await firstValueFrom(this.productService.fetchAllInventory());
    this.inventoryList = result.data;
  }

  async save() {
    if(this.inventoryForm.invalid){
      this.toast.error("Please fill out requied");
      return;
    }
    let payload = this.inventoryForm.value;
    const result = await firstValueFrom(this.productService.saveInventory(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.inventoryList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.inventoryList.splice(found,1);
      }
      }
      this.inventoryList.push(result.data);
      this.toast.success(result.message);
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }

  editInventory(inventory:Inventory){
    this.inventoryForm.patchValue({});
    this.inventoryForm.controls['productId'].setValue(inventory.productId);
    this.inventoryForm.patchValue(inventory);
    this.pageView.resetToCreateView();
  }

  async deleteInventory(inventoryId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.productService.deleteInventory(inventoryId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.inventoryList.findIndex(item => item.id === inventoryId);
      if(found > -1){
        this.inventoryList.splice(found,1);
      }
    }
  }

  clearPage() {
    this.inventoryForm.reset();
    this.inventoryForm.patchValue({});
  }
  closePage(){
    this.inventoryForm.reset();
    this.inventoryForm.patchValue({});
    this.pageView.resetToListView();
  }

  setupForm() {
    this.inventoryForm = this.fb.group({
      id:[null],
      inventoryCode:[null],
      productId:[null, Validators.required],
      frameSize:[0],
      width:[0],
      height:[0],
      quantity:[0],
      sellingPrice:[0],
      unitPrice:[0],
      description:[null],
    })
  }
}
