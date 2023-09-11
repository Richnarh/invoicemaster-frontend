import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Client } from "src/app/dto/Payload";
import { SmsService } from "../services/sms.service";
import { ToastService } from "src/app/utils/toast-service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { MessageFormComponent } from "../message-form/message-form.component";

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.scss']
})
export class SingleMessageComponent implements OnInit{
  @BlockUI('loading') loading: NgBlockUI;

  @ViewChild(MessageFormComponent, { static: false })
  private msgForm: MessageFormComponent;

  pageTitle = "Single Message";
  filterText:string;

  clientList:Client[];
  smsForm:FormGroup;

  constructor(private smsService:SmsService, private toast:ToastService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.fetchClients();
  }

  async fetchClients(){
    this.loading.start("Please wait...");
    const result = await firstValueFrom(this.smsService.fetchClients());
    this.clientList = result.data;
    this.loading.stop();
  }

  selectClient(client:Client){
    this.msgForm.setClient(client);
  }
}
