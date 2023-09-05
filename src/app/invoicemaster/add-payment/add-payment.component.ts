import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { LookupService } from "src/app/services/lookup.service";
import { ToastService } from "src/app/utils/toast-service";
import { InvoiceService } from "../services/invoice.service";
import { Invoice, PaymentData } from "src/app/dto/Payload";

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
  
  constructor(private fb:FormBuilder, private invoiceService:InvoiceService, private toast:ToastService, private lookups:LookupService){}
  
  ngOnInit() {
    this.setupForm();
    this.initLookups();
    this.fullyPaid = false;
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
    if(payload.partialAmountPaid == null || payload.partialAmountPaid == undefined){
      payload.partialAmountPaid = 0.0;
    }
    console.log("payload: ", payload);
    const result = await firstValueFrom(this.invoiceService.savePaymentData(payload, this.invoice.id));
    if(result.success){
      this.toast.success(result.data);
      this.clearPage();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchPaymentInfo(invoice:Invoice){
    this.paymentData = {} as PaymentData;
    this.paymentForm.reset();
    this.paymentForm.patchValue({});
    this.clientName = invoice.client;
    this.totalAmount = invoice.totalAmount;
    const result = await firstValueFrom(this.invoiceService.fetchPaymentInfo(invoice.id));
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
      clientId:[null],
      proformaInvoiceId:[null],
      paymentMethod:[null],
      deliveryStatus:[null, Validators.required],
      paymentStatus:[null, Validators.required],
      partialAmountPaid:[0],
    });
  }
}
