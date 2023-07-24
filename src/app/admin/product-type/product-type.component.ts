import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
import { firstValueFrom } from "rxjs";
import { ProductType } from "src/app/dto/Payload";
import { SweetMessage } from "src/app/utils/sweet-message";
import { ToastService } from "src/app/utils/toast-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit{
  pageTitle:string = "Product Type";

  productTypeName:string;
  productTypeList:ProductType[];
  productTypeForm:FormGroup;

  constructor(private productService:ProductService, private toast:ToastService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.setupForm();
    this.fetchProductTypes();
  }

  async fetchProductTypes(){
    const result = await firstValueFrom(this.productService.fetchAllProductTypes());
    this.productTypeList = result.data;
  }

  async save(){
    if(this.productTypeForm.invalid){
      this.toast.error("Please fill out requied");
      return;
    }
    let payload = this.productTypeForm.value;
    const result = await firstValueFrom(this.productService.saveProductType(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.productTypeList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.productTypeList.splice(found,1);
      }
      }
      this.productTypeList.push(result.data);
      this.toast.success(result.message);
    }else{
      this.toast.error(result.message);
    }
  }

  editProductType(productType:ProductType){
    this.productTypeForm.patchValue({});
    this.productTypeForm.patchValue(productType);
  }
  
  async deleteProductType(productTypeId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.productService.deleteProductType(productTypeId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.productTypeList.findIndex(item => item.id === productTypeId);
      if(found > -1){
        this.productTypeList.splice(found,1);
      }
    }
  }
  clear(){
    this.productTypeForm.reset();
    this.productTypeForm.patchValue({});
  }

  setupForm(){
    this.productTypeForm = this.fb.group({
      id:[null],
      productTypeName:[null, Validators.required]
    })
  }
}
