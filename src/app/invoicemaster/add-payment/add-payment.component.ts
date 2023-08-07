import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { LookupService } from "src/app/services/lookup.service";
import { ToastService } from "src/app/utils/toast-service";
import { InvoiceService } from "../services/invoice.service";
import { Invoice, PaymentData } from "src/app/dto/Payload";
import { EventProxyService } from "src/app/services/event-proxy.service";

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit{
  invoice:Invoice;
  paymentForm:FormGroup;
  paymentData:PaymentData;
  paymentMethodList:LookupItem[];
  deliveryStatusList:LookupItem[];
  paymentStatusList:LookupItem[];

  fullyPaid:boolean;

  clientName:string;
  totalAmount:number;
  
  constructor(private proxy:EventProxyService, private fb:FormBuilder, private invoiceService:InvoiceService, private toast:ToastService, private lookups:LookupService){}
  
  ngOnInit() {
    this.setupForm();
    this.initLookups();
    this.fullyPaid = false;
    this.proxy.getEventSubject().subscribe((param: any) => {
      this.invoice = param;
      if (param !== undefined) {
        this.clientName = param.client;
        this.totalAmount = param.totalAmount;

        this.fetchPaymentInfo(param.id);
      }
    });
  }
  async initLookups(){
    const delivery = await firstValueFrom(this.lookups.deliveryStatus());
    const method = await firstValueFrom(this.lookups.paymentMethod());
    const payment = await firstValueFrom(this.lookups.paymentStatus());

    this.deliveryStatusList = delivery.data;
    this.paymentMethodList = method.data;
    this.paymentStatusList = payment.data;
  }

  async save() {
    if(this.paymentForm.invalid){
      this.toast.error("Please fill out required fields");
      return;
    }
    let payload:PaymentData = this.paymentForm.value;
    payload.clientId = this.invoice.clientId;
    payload.proformaInvoiceId = this.invoice.id;
    console.log("payload: ", payload);
    const result = await firstValueFrom(this.invoiceService.savePaymentData(payload, this.invoice.id));
    if(result.success){
      this.toast.success(result.data);
      this.clearPage();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchPaymentInfo(invoiceId:string){
    this.paymentData = {} as PaymentData;
    this.paymentForm.reset();
    this.paymentForm.patchValue({});
    console.log("invoiceId: ", invoiceId);
    const result = await firstValueFrom(this.invoiceService.fetchPaymentInfo(invoiceId));
    console.log("result: ", result);
    this.paymentData = result.data;
    if(result.data){
      this.paymentForm.patchValue(result.data);
    }
  }

  checkPayment(evt:any){
    this.fullyPaid = evt.target.value === 'FULLY_PAID' ? true : false;
  }

  clearPage(){
    this.paymentForm.reset();
    this.paymentForm.patchValue({});
  }

  setupForm(){
    this.paymentForm = this.fb.group({
      id:[null],
      paymentCode:[null],
      clientName:[null],
      clientId:[null],
      proformaInvoice:[null],
      proformaInvoiceId:[null],
      paymentMethod:[null],
      deliveryStatus:[null, Validators.required],
      deliveryAdress:[null],
      paymentStatus:[null, Validators.required],
      partialAmountPaid:[0],
      totalAmount:[0],
      paymentMessage:[false]
    });
  }
}
