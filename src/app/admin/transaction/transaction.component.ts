import { Component, OnInit } from '@angular/core';
import { PaymentData } from "src/app/dto/PaymentData";
import { TransactionService } from "./../services/transaction-service";
import { LookupService } from "src/app/services/lookup.service";
import { LookupItem } from "src/app/dto/LookupItem";
import { firstValueFrom } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EventProxyService } from "src/app/services/event-proxy.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{
  pageTitle:string = "Transactions";
  paymentDataId:string;
  paymentStatus:string;
  searchForm:FormGroup;
  transactionList:PaymentData[]=[];
  paymentStatusList:LookupItem[];
  paymentDataList:PaymentData[];
  

  sumTotalAmount:number;

  constructor(private evtProxy: EventProxyService, private lookup:LookupService,private transactionService:TransactionService, private fb:FormBuilder){}
  ngOnInit(){
    this.initSearchForm();
    this.initLookups();
  }

  async initLookups(){
    const result = await firstValueFrom(this.lookup.paymentStatus());
    this.paymentStatusList = result.data;
  }

  async editPaymentStatus(paymentDataId:string){
    console.log("paymentDataId: ", paymentDataId);
    this.paymentStatus = ""
    this.paymentDataId = paymentDataId;
    const result = await firstValueFrom(this.transactionService.findById(paymentDataId));
    this.paymentStatus = result.data.paymentStatus;
    console.log("paymentStatus: ",this.paymentStatus);
  }

  async searchPayment(){
    let payload = this.searchForm.value;
    console.log(payload);
    const result = await firstValueFrom(this.transactionService.fetchTransaction(payload.paymentStatus, payload.fromDate, payload.toDate));
    console.log("result: ", result);
    this.paymentDataList = result.data;
    this.sumTotalAmount = 0.0;
    this.paymentDataList.filter(total => this.sumTotalAmount += total.totalAmount);
  }

  initSearchForm(){
    this.searchForm = this.fb.group({
      paymentStatus:null,
      fromDate:null,
      toDate:null
    })
  }

  clear(){
    this.searchForm.reset();
    this.searchForm.patchValue({});
  }
}
