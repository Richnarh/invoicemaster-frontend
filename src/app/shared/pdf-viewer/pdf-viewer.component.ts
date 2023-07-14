import { Component, Input, OnInit } from '@angular/core';
import { PaymentData } from "src/app/dto/PaymentData";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent{
  pdf:any;
  @Input() pdfTitle:string;

  waybillPdf(data:any, paymentData:PaymentData){
    this.pdfTitle = paymentData.clientName +"-"+paymentData.proformaInvoice +" (Waybill Report)";
    this.pdf = "data:application/pdf;base64,"+data;
  }
  invoicePdf(data:any){
    this.pdfTitle = "Report";
    this.pdf = "data:application/pdf;base64,"+data;
  }
}