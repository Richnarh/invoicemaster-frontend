import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tax, TaxGroup } from 'src/app/dto/Payload';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http:HttpClient) { }

  saveTaxGroup(taxGroup: TaxGroup) {
    if (!taxGroup.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/tax-group`, taxGroup);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/tax-group`, taxGroup);
  }
  
  saveTax(tax: Tax) {
    if (!tax.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/tax`, tax);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/tax`, tax);
  }

  findAllTaxGroups(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/tax-group/list`);
  }
  findTaxesByGroups(taxGroupId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/tax/list/${taxGroupId}`);
  }
  deleteTaxGroup(taxGroupId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/tax-group/${taxGroupId}`);
  }
  deleteTax(taxId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/tax/${taxId}`);
  }
}
