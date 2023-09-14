import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { firstValueFrom } from "rxjs";
import { Client } from "src/app/dto/Payload";
import { ToastService } from "src/app/utils/toast-service";
import { SmsService } from "../services/sms.service";
import { LookupItem } from "src/app/dto/LookupItem";
import { LookupService } from "src/app/services/lookup.service";
import { GroupContact } from "src/app/dto/smsPayload";

@Component({
  selector: 'app-bulk-message',
  templateUrl: './bulk-message.component.html',
  styleUrls: ['./bulk-message.component.scss']
})
export class BulkMessageComponent {
  @BlockUI('loading') loading: NgBlockUI;
  pageTitle = "Bulk Message";
  filterText:string;

  client:Client;
  smsGrupId:any;
  smsGroupList:LookupItem[];
  clientList:Client[];
  smsForm:FormGroup;

  constructor(private smsService:SmsService, private toast:ToastService, private fb:FormBuilder, private lookup:LookupService){}

  ngOnInit(){
    this.initLookups();
  }

  async initLookups(){
    const group = await firstValueFrom(this.lookup.smsGroup());
    this.smsGroupList = group.data;
  }

  groupValueChange(event:any){
    this.smsGrupId = event.target.value;
    this.fetchClients(this.smsGrupId);
  }

  async fetchClients(smsGroupId:any){
    console.log("smsGroupId: ", smsGroupId);
    this.loading.start("Please wait...");
    const result = await firstValueFrom(this.smsService.fetchContactByGroup(smsGroupId));
    console.log("result: ", result);
    this.clientList = [];
    result.data.forEach((data:GroupContact) => {
      this.client = {} as Client;
      this.client.id = data.clientId;
      this.client.clientName = data.client;
      this.client.phone = data.phoneNumber
      this.clientList.push(this.client);
    });
    console.log("clientList: ", this.clientList);
    this.loading.stop();
  }
}
