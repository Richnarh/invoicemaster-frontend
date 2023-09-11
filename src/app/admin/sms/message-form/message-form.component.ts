import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { Client } from "src/app/dto/Payload";
import { SmsMessage } from "src/app/dto/smsPayload";
import { LookupService } from "src/app/services/lookup.service";
import { SmsService } from "../services/sms.service";
import { ToastService } from "src/app/utils/toast-service";

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit{
  messageType:string;
  messageTemplateId:any;
  textMessage:any;
  messsageTemplateList:LookupItem[];
  messsageTypeList:LookupItem[];
  client:Client;
  sms:SmsMessage;

  constructor(private lookup:LookupService, private smsService:SmsService, private toast:ToastService){}
 
 ngOnInit(){
    this.initLookups();
    this.messageType = "TEXT_MESSAGING";
  }

  async initLookups(){
    const result = await firstValueFrom(this.lookup.messageType());
    this.messsageTypeList = result.data;

    const template = await firstValueFrom(this.lookup.messageTemplates());
    this.messsageTemplateList = template.data;
  }

  restTemplate(event:any){
    this.messageTemplateId = null;
    this.textMessage = null;
  }

  setClient(client:Client){
    this.client = client;
  }

  async sendMessage(){
    if(this.client === undefined){
      this.toast.error("Please select a client");
      return;
    }
    if(this.messageType === "TEMPLATE_MESSAGING" && this.messageTemplateId === null){
      this.toast.error("Please select a template");
      return;
    }
    if(this.messageType === "TEXT_MESSAGING" && this.textMessage === null || this.textMessage == ""){
      this.toast.error("Please type a message");
      return;
    }
    this.sms = {} as SmsMessage;
    this.sms.clientId = this.client.id;
    this.sms.messagingType = this.messageType;
    this.sms.messageTemplateId = this.messageTemplateId;
    this.sms.textMessage = this.textMessage;

    console.log("SMS: ", this.sms);
    const result = await firstValueFrom(this.smsService.sendSingleSms(this.sms));
    console.log(result);
  }

  clear(){
    this.client = {} as Client;
    this.messageType = "TEXT_MESSAGING";
    this.textMessage = null;
  }
}
