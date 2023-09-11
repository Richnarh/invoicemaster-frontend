import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { firstValueFrom } from "rxjs";
import { Client } from "src/app/dto/Payload";
import { ToastService } from "src/app/utils/toast-service";
import { SmsService } from "../services/sms.service";

@Component({
  selector: 'app-bulk-message',
  templateUrl: './bulk-message.component.html',
  styleUrls: ['./bulk-message.component.scss']
})
export class BulkMessageComponent {
  @BlockUI('loading') loading: NgBlockUI;
  pageTitle = "Bulk Message";
  filterText:string;

  clientList:Client[];
  smsForm:FormGroup;

  constructor(private smsService:SmsService, private toast:ToastService, private fb:FormBuilder){}

  ngOnInit(){
    this.fetchClients();
  }

  async fetchClients(){
    this.loading.start("Please wait...");
    const result = await firstValueFrom(this.smsService.fetchClients());
    this.clientList = result.data;
    this.loading.stop();
  }
}
