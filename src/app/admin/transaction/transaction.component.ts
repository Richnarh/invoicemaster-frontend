import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from "./../services/transaction-service";
import { LookupItem } from "src/app/dto/LookupItem";
import { firstValueFrom } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PdfViewerComponent } from "../../shared/pdf-viewer/pdf-viewer.component";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ToastService } from "src/app/utils/toast-service";
import { SweetMessage } from "src/app/utils/sweet-message";
import { PaymentData } from "src/app/dto/Payload";
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{
  @BlockUI('loading') loading: NgBlockUI;

  @ViewChild(PdfViewerComponent, { static: false })
  private pdfViewer:PdfViewerComponent;

  pageTitle:string = "Transactions";
  paymentDataId:string;
  paymentStatus:string;
  deliveryStatus:string;
  searchForm:FormGroup;
  transactionList:PaymentData[]=[];
  paymentDataDeliveryList:PaymentData[]=[];
  paymentStatusList:LookupItem[];
  deliveryStatusList:LookupItem[];
  paymentDataList:PaymentData[];
  
  pageSize = 10;
  page = 1;
  sumTotalAmount:number;

  constructor(private toast: ToastService, private lookup:LookupService,private transactionService:TransactionService, private fb:FormBuilder){}
  ngOnInit(){
    this.initSearchForm();
    this.initLookups();
  }

  async initLookups(){
    const payment = await firstValueFrom(this.lookup.paymentStatus());
    this.paymentStatusList = payment.data;

    const delivery = await firstValueFrom(this.lookup.deliveryStatus());
    this.deliveryStatusList = delivery.data;
  }

  async editPaymentStatus(paymentDataId:string){
    this.paymentStatus = ""
    this.paymentDataId = paymentDataId;
    const result = await firstValueFrom(this.transactionService.findById(paymentDataId));
    this.paymentStatus = result.data.paymentStatus ? result.data.paymentStatus : "N/A";
  }

  async searchPayment(){
    this.loading.start("Loading...");
    let payload = this.searchForm.value;
    const result = await firstValueFrom(this.transactionService.fetchTransaction(payload.paymentStatus, payload.fromDate, payload.toDate));
    this.paymentDataList = result.data;
    this.sumTotalAmount = 0.0;
    this.paymentDataList.filter(total => this.sumTotalAmount += total.totalAmount);
    this.loading.stop();
  }

  async fetchByDeliveryStatus(){
    this.loading.start("Loading...");
    const result = await firstValueFrom(this.transactionService.fetchByDeliveryStatus(this.deliveryStatus));
    this.paymentDataDeliveryList = result.data;
    this.loading.stop();
  }

  async updateDeliveryStatus(paymentDataId:string){
    const result  = await firstValueFrom(this.transactionService.updateDeliveryStatus(paymentDataId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.paymentDataDeliveryList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.paymentDataDeliveryList.splice(found,1);
      }
    }
  }

  async deletePaymentData(paymentDataId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.transactionService.deletePaymentData(paymentDataId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.paymentDataList.findIndex(item => item.id === paymentDataId);
      if(found > -1){
        this.paymentDataList.splice(found,1);
      }
    }
  }

  async generateWaybill(data:PaymentData){
    const report = await firstValueFrom(this.transactionService.report(data.id));
    this.pdfViewer.waybillPdf(report.data, data);
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
    this.paymentDataList = [];
    this.searchForm.patchValue({});
  }
  clearDelivery(){
    this.deliveryStatus = "";
    this.paymentDataDeliveryList = [];
  }
}
