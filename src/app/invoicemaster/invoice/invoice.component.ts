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

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit{
  @BlockUI('loading') loading: NgBlockUI;
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfViewer:PdfViewerComponent;

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

  constructor(private proxy:EventProxyService, private fb:FormBuilder, private invoiceService:InvoiceService, private toast:ToastService, private lookups:LookupService){}
  
  ngOnInit() {
    this.setupForm();
    this.initLookups();

    this.invoicesToday();
  }

  initInvoice(){
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({});
    this.pageView.resetToCreateView();
  }

  refreshClient(){
    this.initLookups();
    this.toast.info("Client updated");
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
  
  async save(){
    
  }
  async generateInvoice(invoice:Invoice){
    const report = await firstValueFrom(this.invoiceService.invoiceReport(invoice.id));
    this.pdfViewer.viewPdf(report.data, invoice);
  }
  async generateReceipt(invoice:Invoice){
    const report = await firstValueFrom(this.invoiceService.invoiceReceipt(invoice.id));
    this.pdfViewer.viewPdf(report.data, invoice);
  }

  async invoiceItem(invoice:Invoice){
    this.loading.start("Loading...");
    this.invoice=invoice;
    const result = await firstValueFrom(this.invoiceService.manageInvoice(invoice.id));
    this.loading.stop();
    this.proxy.sendEvent(result.data);
    this.pageView.resetToDetailView();
  }

  paymentInfo(invoice:Invoice){
    this.invoice = invoice;
    this.proxy.sendEvent(invoice);
  }
  async requestReversal(invoice:Invoice){
    const result = await firstValueFrom(this.invoiceService.reverseApproval(invoice.id));
    if(result.data){
      this.toast.success(result.data);
    }
  }
  editInvoice(invoice:Invoice){
    console.log(invoice)
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
      clientId:[null],
      phoneNumber:[null],
      quotationNumber:[null],
      totalAmount:[0],
      subTotalAmount:[0],
      modeOfPayment:[null],
      discountRate:[0],
      installationFee:[0],
      description:[null],
      converted:[false],
      invoiceItemList:[[]],
    });
  }
}
