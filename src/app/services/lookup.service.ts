import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse2 } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment"
import { LookupItem } from "../dto/LookupItem";

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient) { }

  // ENTITIES
  companyProfile(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/company-profile`);
  }
  companyBranch(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/company-company`);
  }
  inventory(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/inventory`);
  }
  products(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/products`);
  }
  productTypes(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/product-type`);
  }
  employees(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/employees`);
  }
  clients(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/clients`);
  }
  paymentMethod(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/payment-method`);
  }
  saleslead(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/saleslead`);
  }

  // ENUMS
  paymentStatus(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/payment-status`);
  }
  deliveryStatus(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/delivery-status`);
  }
  units(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/units`);
  }
  currency(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/currency`);
  }
  status(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/status`);
  }
  accessLevel(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/access-level`);
  }
  clientType(){
    return this.http.get<ApiResponse2<LookupItem>>(`${env.lookupEndpoint}/client-type`);
  }
}
