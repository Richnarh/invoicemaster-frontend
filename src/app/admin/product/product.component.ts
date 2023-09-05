import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { Product } from "src/app/dto/Payload";
import { LookupService } from "src/app/services/lookup.service";
import { PageView } from "src/app/utils/page-view";
import { ProductService } from "../services/product.service";
import { SweetMessage } from "src/app/utils/sweet-message";
import { ToastService } from "src/app/utils/toast-service";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  @BlockUI('loading') loading: NgBlockUI;

  pageTitle:string = "Products";
  pageView:PageView = PageView.listView();

  imageSrc: string;
  productForm:FormGroup;
  productList:Product[];
  productTypeList:LookupItem[];

  filterText:string;
  productName:string;
  description:string;
  productImage:any;
  pageSize = 10;
  page = 1;

  constructor(private lookup:LookupService, private productService:ProductService, private fb:FormBuilder, private toast:ToastService){}

  ngOnInit() {
    this.setupForm();
    this.initLookups();
  }

  initProduct(){
    this.productForm.reset();
    this.productForm.patchValue({});
    this.pageView.resetToCreateView();
  }

  async initLookups(){
    const result = await firstValueFrom(this.lookup.productTypes());
    this.productTypeList = result.data;
  }

  async fetchProducts(){
    this.loading.start("Loading...");
    const result = await firstValueFrom(this.productService.fetchAllProducts());
    this.productList = result.data;
    this.loading.stop();
  }
  async save() {
    if(this.productForm.invalid){
      this.toast.error("Please fill out requied");
      return;
    }
    let payload = this.productForm.value;
    const result = await firstValueFrom(this.productService.saveProduct(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.productList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.productList.splice(found,1);
      }
      }
      this.productList.push(result.data);
      this.toast.success(result.message);
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }
  onChange(event:any){
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        // this.imageSrc = reader.result as string;
        this.productForm.patchValue({
          productImage: reader.result,
        });
      };
   
    }
  }
  editProduct(product:Product){
    this.productForm.patchValue({});
    this.productForm.controls['productTypeId'].setValue(product.productTypeId);
    this.productForm.patchValue(product);
    this.pageView.resetToCreateView();
  }

  viewImage(product:Product){
    this.productImage = product.productImage;
    this.productName = product.productName;
    this.description = product.description;    
  }

  async deleteProduct(productId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.productService.deleteInventory(productId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.productList.findIndex(item => item.id === productId);
      if(found > -1){
        this.productList.splice(found,1);
      }
    }
  }
  clearPage() {
    this.productForm.reset();
    this.productForm.patchValue({});
  }
  closePage(){
    this.productForm.reset();
    this.productForm.patchValue({});
    this.pageView.resetToListView();
  }

  setupForm(){
    this.productForm = this.fb.group({
      id:[null],
      productName:[null, Validators.required],
      productCode:[null],
      productType:[null],
      productTypeId:[null],
      reorderLevel:[0],
      productImage:[null],
      imageFormat:[null],
      description:[null],
    });
  }
}
