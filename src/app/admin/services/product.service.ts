import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Inventory, Product, ProductType } from "src/app/dto/Payload";
import { ApiResponse } from "src/app/utils/apiResponse";
import { environment as env } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http:HttpClient) { }

  saveInventory(inventory: Inventory) {
    if (!inventory.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/inventory`, inventory);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/inventory`, inventory);
  }
  fetchAllInventory(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/inventory/list`);
  }
  getInventoryById(inventoryId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/inventory/${inventoryId}`);
  }
  deleteInventory(inventoryId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/inventory/${inventoryId}`);
  }

  saveProduct(product: Product) {
    if (!product.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/product`, product);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/product`, product);
  }
  fetchAllProducts(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/product/list`);
  }
  deleteProduct(productId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/product/${productId}`);
  }

  saveProductType(productType: ProductType) {
    if (!productType.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/product-type`, productType);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/product-type`, productType);
  }
  fetchAllProductTypes(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/product-type/list`);
  }
  deleteProductType(productTypeId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/product-type/${productTypeId}`);
  }
}
