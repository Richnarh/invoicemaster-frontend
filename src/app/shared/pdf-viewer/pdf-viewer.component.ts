import { Component, Input, OnInit } from '@angular/core';
import { PaymentData } from "src/app/dto/Payload";
import { Invoice } from "./../../dto/Payload";
import { param1, param2 } from "src/app/utils/dateUtils";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent{
  pdf:any;
  pdf2:any;
  pdf3:any;
  defaultTitle:string = "Reporting";
  @Input() pdfTitle:string;

  constructor(){}

  waybillPdf(data:any, paymentData:PaymentData){
    this.pdf=this.pdf2=this.pdf3=undefined;
    this.pdfTitle = paymentData.clientName +"-"+paymentData.proformaInvoice +" (Waybill Report)";
    this.pdf2 = data;
  }
  viewPdf(data:any[], invoice:Invoice){
    this.pdf=this.pdf2=this.pdf3=undefined;
    this.pdfTitle = invoice.client + "-"+ invoice.quotationNumber;
    this.pdf = [];
    this.pdf.push("data:application/pdf;base64,"+data[0]);
    this.pdf.push("data:application/pdf;base64,"+data[1]);
  }
  receiptPdf(data:any[], invoice:Invoice){
    this.pdf=this.pdf2=this.pdf3=undefined;
    this.pdfTitle = invoice.client + "-"+ invoice.quotationNumber;
    this.pdf3 = data;
  }
}
