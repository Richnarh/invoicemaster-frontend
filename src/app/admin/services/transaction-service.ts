import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentData } from "src/app/dto/PaymentData";
import { ApiResponse, ApiResponse2 } from "src/app/utils/apiResponse";
import { environment as env } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private http:HttpClient) { }

  fetchTransaction(paymentStatus:string, fromDate:any, toDate:any):Observable<ApiResponse2<PaymentData>>{
    return this.http.get<ApiResponse2<any>>(`${env.endpoint}/payment?paymentStatus=${paymentStatus}&fromDate=${fromDate}&toDate=${toDate}`);
  }
  fetchByDeliveryStatus(deliveryStatus:string):Observable<ApiResponse2<PaymentData>>{
    return this.http.get<ApiResponse2<any>>(`${env.endpoint}/payment/delivery/${deliveryStatus}`);
  }
  findById(paymentDataId:string):Observable<ApiResponse<PaymentData>>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/payment/${paymentDataId}`);
  }
  report(paymentDataId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/payment/${paymentDataId}/report`);
  }
  updateDeliveryStatus(paymentDataId:string):Observable<ApiResponse<PaymentData>>{
    return this.http.put<ApiResponse<any>>(`${env.endpoint}/payment/${paymentDataId}`,{});
  }
  updatePaymentStatus(paymentStatus:string, paymentDataId:string):Observable<ApiResponse<any>>{
    return this.http.put<ApiResponse<any>>(`${env.endpoint}/payment/${paymentStatus}/${paymentDataId}`,{});
  }
  deletePaymentData(paymentDataId:string):Observable<ApiResponse<any>>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/payment/${paymentDataId}`);
  }
}
