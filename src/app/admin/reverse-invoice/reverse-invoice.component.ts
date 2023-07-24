import { HttpStatusCode } from "@angular/common/http";
import { Component } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { InvoiceService } from "src/app/invoicemaster/services/invoice.service";
import { ToastService } from "src/app/utils/toast-service";

@Component({
  selector: 'app-reverse-invoice',
  templateUrl: './reverse-invoice.component.html',
  styleUrls: ['./reverse-invoice.component.scss']
})
export class ReverseInvoiceComponent {
  pageTitle:string = "Reverse Invoice";
  proformaInvoiceList:any[];
  invoiceNo:string;

  constructor(private toast:ToastService, private invoiceService:InvoiceService){}

  async search(){
    this.proformaInvoiceList = [];
    if(this.invoiceNo === "" || this.invoiceNo === undefined){
      this.toast.error("Please enter invoice number");
      return;
    }
    const result = await firstValueFrom(this.invoiceService.searchByInvoiceNo(this.invoiceNo.trim()));
    if(result.success){
      this.proformaInvoiceList.push(result.data);
    }else{
      this.toast.errorMessage(result.data.toString(),result.message);
    }
  }

  clear(){
    this.invoiceNo = "";
    this.proformaInvoiceList = [];
  }

  async reverse(invoiceId:string){
    const result = await firstValueFrom(this.invoiceService.reverseInvoice(invoiceId));
    console.log("result: ", result);
    if(result.success){
      this.toast.success(result.message);
    }
  }
}
