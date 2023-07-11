import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from "src/app/utils/apiResponse";
import { environment as env } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private http:HttpClient) { }

  fetchTransaction(paymentStatus:string, fromDate:any, toDate:any):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/payment?paymentStatus=${paymentStatus}&fromDate=${fromDate}&toDate=${toDate}`);
  }
  findById(paymentDataId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/payment/${paymentDataId}`);
  }
  report(paymentDataId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/payment/${paymentDataId}/report`);
  }
  updatePaymentStatus(paymentStatus:string, paymentDataId:string):Observable<any>{
    return this.http.put<ApiResponse<any>>(`${env.endpoint}/payment/${paymentStatus}/${paymentDataId}`,{});
  }
}
