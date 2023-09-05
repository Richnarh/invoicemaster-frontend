import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Invoice, PaymentData, Sales } from "src/app/dto/Payload";
import { ApiResponse } from "src/app/utils/apiResponse";
import { environment as env } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  
  constructor(private http:HttpClient) { }

  invoiceParams(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/invoice-params`);
  }
  searchByInvoiceNo(invoiceNo:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice?q=${invoiceNo}`);
  }
  reverseInvoice(invoiceId:string){
    return this.http.post<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}`, {});
  }
  saveInvoice(invoice:Invoice){
    if (!invoice.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/invoice`, invoice);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/invoice`, invoice);
  }
  saveAll(sales:Sales){
    return this.http.post<ApiResponse<any>>(`${env.endpoint}/invoice/save-all`, sales);
  }
  reverseApproval(invoiceId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/reverse`,);
  }
  savePaymentData(paymentData:PaymentData, invoiceId:string){
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
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/report`,);
  }
  invoiceReceipt(invoiceId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/receipt`);
  }
  manageInvoice(invoiceId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/invoice/${invoiceId}/manage`);
  }
}
