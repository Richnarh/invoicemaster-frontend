import { Component, OnInit } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { Invoice, InvoiceItem } from "src/app/dto/Payload";
import { InvoiceService } from "src/app/invoicemaster/services/invoice.service";
import { LookupService } from "src/app/services/lookup.service";

@Component({
  selector: 'app-sales-log',
  templateUrl: './sales-log.component.html',
  styleUrls: ['./sales-log.component.scss']
})
export class SalesLogComponent implements OnInit{
  @BlockUI('loading') loading: NgBlockUI;
  pageTitle:string = "Sales Log";
  
  invoiceList:Invoice[];
  invoiceItemList:InvoiceItem[];
  branchList:LookupItem[];
  usersList:LookupItem[];
  fromDate:Date;
  toDate:Date;
  userId:string;
  branchId:string;
  clientName:string;
  phoneNumber:string;
  valueDate:string;
  filterText:string;

  constructor(private lookup:LookupService, private invoiceService:InvoiceService){}

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
    this.loading.start("Loading...");
    this.invoiceList = [];
    const result = await firstValueFrom(this.invoiceService.searchByDate(this.fromDate, this.toDate));
    this.invoiceList = result.data;
    this.loading.stop();
  }

  async searchByBranch(event:any){
    this.loading.start("Loading...");
    this.invoiceList = [];
    const result = await firstValueFrom(this.invoiceService.searchByBranch(this.branchId));
    this.invoiceList = result.data;
    this.loading.stop();
  }

  async searchByUser(event:any){
    this.loading.start("Loading...");
    this.invoiceList = [];
    const result = await firstValueFrom(this.invoiceService.searchByUser(this.userId));
    this.invoiceList = result.data;
    this.loading.stop();
  }

  async fetchDetails(invoice:Invoice){
    this.clientName = invoice.client;
    this.phoneNumber = invoice.phoneNumber;
    this.valueDate = invoice.valueDate.toString();
    const result = await firstValueFrom(this.invoiceService.fetchInvoiceDetails(invoice.id));
    this.invoiceItemList = result.data;
  }

  searchByParam(){
    
  }

  clearSearch(){
    this.clientName = "";
    this.phoneNumber = "";
    this.userId = "";
    this.branchId = "";
    this.valueDate = "";
    this.invoiceList = [];
    this.invoiceItemList = [];
  }
}
