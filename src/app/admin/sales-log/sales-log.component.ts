import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { Invoice, InvoiceItem } from "src/app/dto/Payload";
import { InvoiceService } from "src/app/invoicemaster/services/invoice.service";
import { LookupService } from "src/app/services/lookup.service";
import { ToastService } from "src/app/utils/toast-service";

@Component({
  selector: 'app-sales-log',
  templateUrl: './sales-log.component.html',
  styleUrls: ['./sales-log.component.scss']
})
export class SalesLogComponent implements OnInit{
  pageTitle:string = "Sales Log";
  
  invoiceList:Invoice[];
  invoiceItemList:InvoiceItem[];
  branchList:LookupItem[];
  usersList:LookupItem[];
  fromDate:Date;
  toDate:Date;
  userId:string;
  branchId:string;

  constructor(private toast:ToastService, private lookup:LookupService, private invoiceService:InvoiceService){}

  ngOnInit() {
    this.initLookups();
  }

  async initLookups(){
    const branch = await firstValueFrom(this.lookup.companyBranch());
    const user = await firstValueFrom(this.lookup.employees());

    this.branchList = branch.data;
    this.usersList = user.data;
  }

  async searchByDate(){
    const result = await firstValueFrom(this.invoiceService.searchByDate(this.fromDate, this.toDate));
    this.invoiceList = result.data;
  }

  async searchByBranch(event:any){
    const result = await firstValueFrom(this.invoiceService.searchByBranch(this.branchId));
    this.invoiceList = result.data;
  }

  async searchByUser(event:any){
    const result = await firstValueFrom(this.invoiceService.searchByBranch(this.userId));
    this.invoiceList = result.data;
  }

  async fetchDetails(invoiceId:string){
    const result = await firstValueFrom(this.invoiceService.fetchInvoiceDetails(invoiceId));
    this.invoiceItemList = result.data;
  }

}
