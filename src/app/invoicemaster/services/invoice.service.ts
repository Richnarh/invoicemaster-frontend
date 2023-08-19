import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Invoice, PaymentData } from "src/app/dto/Payload";
import { ApiResponse } from "src/app/utils/apiResponse";
import { environment as env } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  
  constructor(private http:HttpClient) { }

  searchByInvoiceNo(invoiceNo:string):Observable<ApiResponse<Invoice>>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice?q=${invoiceNo}`);
  }
  reverseInvoice(invoiceId:string):Observable<ApiResponse<any>>{
    return this.http.post<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}`, {});
  }
  reverseApproval(invoiceId:string):Observable<ApiResponse<any>>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/reverse`,);
  }
  savePaymentData(paymentData:PaymentData, invoiceId:string):Observable<ApiResponse<any>>{
    return this.http.post<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/payment-data`, paymentData);
  }
  searchByDate(fromDate:Date, toDate:Date){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/search?fromDate=${fromDate}&toDate=${toDate}`);
  }
  invoiceToday(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/today`);
  }
  fetchInvoiceDetails(invoiceId: string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}`);
  }
  searchByBranch(branchId: string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/search/${branchId}`);
  }
  searchByUser(userId: string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/search/${userId}/user`);
  }
  fetchPaymentInfo(invoiceId: string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/payment-data`);
  }
  invoiceReport(invoiceId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/report`);
  }
  invoiceReceipt(invoiceId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/receipt`);
  }
  manageInvoice(invoiceId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/manage`);
  }
}
