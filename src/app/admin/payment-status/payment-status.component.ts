import { Component, Input, OnInit } from '@angular/core';
import { LookupItem } from "src/app/dto/LookupItem";
import { TransactionService } from "./../services/transaction-service";
import { firstValueFrom } from "rxjs";
import { ToastService } from "src/app/utils/toast-service";
import { HttpStatusCode } from "@angular/common/http";

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit{
  @Input() paymentStatusList:LookupItem[];
  @Input() paymentDataId:string;
  @Input() paymentStatus:string;

  constructor(private transactionService : TransactionService,private toast:ToastService){

  }
  ngOnInit(){
    
  }

  async updateStatus(){
    const result = await firstValueFrom(this.transactionService.updatePaymentStatus(this.paymentStatus, this.paymentDataId));
    if(result.statusCode == HttpStatusCode.Ok){
      this.toast.success(result.data);
    }
  }
}
