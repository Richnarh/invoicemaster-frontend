import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Invoice } from "src/app/dto/Payload";
import { InvoiceService } from "../services/invoice.service";
import { firstValueFrom } from "rxjs";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { PageView } from "src/app/utils/page-view";
import { ToastService } from "src/app/utils/toast-service";
import { LookupItem } from "src/app/dto/LookupItem";
import { LookupService } from "src/app/services/lookup.service";
import { EventProxyService } from "./../../services/event-proxy.service";
import { PdfViewerComponent } from "src/app/shared/pdf-viewer/pdf-viewer.component";
import { CompanyService } from "src/app/admin/services/company.service";
import { Config } from "src/app/dto/constant";
import { DatePipe } from "@angular/common";
import { DateUtils } from "src/app/utils/dateUtils";
import { SweetMessage } from "src/app/utils/sweet-message";
import { AddPaymentComponent } from "../add-payment/add-payment.component";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { StorageService } from "src/app/services/storage.service";
import { LocalKeys } from "src/app/utils/LocalKeys";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit{
  @BlockUI('loading') loading: NgBlockUI;
  
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfViewer:PdfViewerComponent;
  
  @ViewChild(AddPaymentComponent, { static: false })
  private addPayment:AddPaymentComponent;
  
  pageView:PageView = PageView.listView();
  pageTitle:string = "Proforma Invoice";
  invoiceList:Invoice[];
  clientList:LookupItem[];
  modeOfPaymentList:LookupItem[];
  invoice:Invoice;
  invoiceForm:FormGroup;
  fromDate:any = "";
  toDate:any = "";

  filterText:string;
  limitValue:string;
  userId:string;
  pageSize = 2;
  page = 1;

  issuedDate:Date;
  expiryDate:Date;

  constructor(
    private proxy:EventProxyService, private companyService:CompanyService, private fb:FormBuilder, 
    private invoiceService:InvoiceService, private toast:ToastService, private lookups:LookupService,
    private datePipe: DatePipe, private storageService: StorageService){
  }
  
  ngOnInit() {
    this.setupForm();
    this.initLookups();

    this.invoicesToday();
    this.fetchPageLimit();
    this.userId = JSON.parse(this.storageService.getLocalObject(LocalKeys.CurrenUserId)!);
  }

  async initInvoice(){
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({});
    const result = await firstValueFrom(this.invoiceService.invoiceParams());
    this.issuedDate = new Date();
    this.expiryDate = DateUtils.daysFrom2Day(7);
    this.invoiceForm.controls["quotationNumber"].setValue(result.data.quotationNumber);
    this.pageView.resetToCreateView();
  }

  refreshClient(){
    this.initLookups();
    this.toast.info("Client updated");
  }

  async fetchPageLimit(){
    const result = await firstValueFrom(this.companyService.findByConfigName(Config.PAGE_LIMIT));
    this.limitValue = result.data?.configValue;
  }

  async savePageLimit(){
    const result = await firstValueFrom(this.companyService.updateByConfigName(Config.PAGE_LIMIT, this.limitValue));
    if(result.data){
      this.limitValue = result.data?.configValue;
      this.toast.success(result.message);
    }
  }

  async initLookups(){
    const client = await firstValueFrom(this.lookups.clients());
    const mode = await firstValueFrom(this.lookups.paymentMethod());

    this.clientList = client.data;
    this.modeOfPaymentList = mode.data;
  }

  async invoicesToday(){
    this.loading.start("Loading...");
    const result = await firstValueFrom(this.invoiceService.invoiceToday());
    if(result.data.lenth < 1){
      this.loading.stop();
      this.toast.info("No Record Found");
      return;
    }
    this.invoiceList = result.data;
    this.loading.stop();
  }

  async searchInvoice(){
    this.loading.start("Loading...");
    const result = await firstValueFrom(this.invoiceService.searchByDate(this.fromDate, this.toDate));
    this.invoiceList = result.data;
    this.loading.stop();
  }
  
  async saveInvoice(){
    if(this.invoiceForm.invalid){
      this.toast.error("Please fill out required fields");
      return;
    }
    let payload = this.invoiceForm.value;
    payload.issuedDate = this.datePipe.transform(this.invoiceForm.get("issuedDate")?.value,"yyyy-MM-dd");
    payload.expiryDate = this.datePipe.transform(this.invoiceForm.get("expiryDate")?.value,"yyyy-MM-dd");
    if(payload.totalAmount == null || payload.totalAmount == undefined){
      payload.totalAmount = 0.0;
    }
    const result = await firstValueFrom(this.invoiceService.saveInvoice(payload));
    if(result.success){
      this.invoiceList.push(result.data);
      this.toast.success(result.message);
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }
  async generateInvoice(invoice:Invoice){
    const url = Config.REPORT_URL+"?id="+invoice.quotationNumber;
    console.log("url: ", url);
    window.open(url, "_blank");
    // let reportArray = [];
    
    // const report = await firstValueFrom(this.invoiceService.invoiceReport(invoice.id));
    // reportArray.push(report.data.invoiceCover);
    // reportArray.push(report.data.invoiceReport)
    
    // console.log("report: ", reportArray);
    // this.pdfViewer.viewPdf(reportArray, invoice);
  }
  async generateReceipt(invoice:Invoice){
    const report = await firstValueFrom(this.invoiceService.invoiceReceipt(invoice.id));
    this.pdfViewer.receiptPdf(report.data, invoice);
  }

  async invoiceItem(invoice:Invoice){
    this.loading.start("Please wait...");
    this.invoice=invoice;
    const result = await firstValueFrom(this.invoiceService.manageInvoice(invoice.id));
    this.loading.stop();
    this.proxy.sendEvent(result.data);
    this.pageView.resetToDetailView();
  }

  paymentInfo(invoice:Invoice){
    this.invoice = invoice;
    this.addPayment.fetchPaymentInfo(invoice);
  }
  async requestReversal(invoice:Invoice){
    const confirm = await SweetMessage.confirm("Reverse Invoice", "Do you want to request reversal?");
    if (!confirm.value) return;
    const result = await firstValueFrom(this.invoiceService.reverseApproval(invoice.id));
    if(result.data){
      this.toast.success(result.data);
    }
  }
  editInvoice(invoice:Invoice){
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({});
    this.invoiceForm.patchValue(invoice);
    this.invoiceForm.controls['clientId'].setValue(invoice.clientId);
    this.invoiceForm.controls['modeOfPayment'].setValue(invoice.modeOfPayment);
    this.invoiceForm.controls['issuedDate'].setValue(invoice.issuedDate);
    this.invoiceForm.controls['expiryDate'].setValue(invoice.expiryDate);
    this.pageView.resetToCreateView();
  }
 
  clear(){

  }
  reset(){
    this.fromDate = "";
    this.toDate = "";
    this.invoiceList = [];
    this.invoicesToday();
  }

  clearPage() {
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({});
  }
  closePage(){
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({});
    this.pageView.resetToListView();
  }
  setupForm(){
    this.invoiceForm = this.fb.group({
      id:[null],
      issuedDate:[new Date(), Validators.required],
      expiryDate:[new Date(), Validators.required],
      clientId:[null, Validators.required],
      quotationNumber:[null, Validators.required],
      totalAmount:0.0,
      modeOfPayment:[null],
      description:[null],
    });
  }
}
