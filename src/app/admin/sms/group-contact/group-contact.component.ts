import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GroupContact, SmsGroup } from "src/app/dto/smsPayload";
import { ToastService } from "src/app/utils/toast-service";
import { SmsService } from "../services/sms.service";
import { LookupItem } from "src/app/dto/LookupItem";
import { firstValueFrom } from "rxjs";
import { LookupService } from "src/app/services/lookup.service";

@Component({
  selector: 'app-group-contact',
  templateUrl: './group-contact.component.html',
  styleUrls: ['./group-contact.component.scss']
})
export class GroupContactComponent implements OnInit{
  pageTitle = "Group Contacts";

  groupContact:GroupContact;
  groupContactList:GroupContact[];
  groupContactForm:FormGroup;

  smsGroupList:LookupItem[];
  clientList:LookupItem[];

  constructor(private fb:FormBuilder, private toast:ToastService, private smsService:SmsService, private lookup:LookupService){}

  ngOnInit(): void {
    this.setupForm();
    this.initLookups();
    this.fetchGroupContacts();
  }

  async initLookups(){
    const group = await firstValueFrom(this.lookup.smsGroup());
    const client = await firstValueFrom(this.lookup.clients());
    
    this.smsGroupList = group.data;
    this.clientList = client.data;
  }

  pushToGroups(smsGroup:SmsGroup){
    let up =  {} as LookupItem;
    up.id = smsGroup.id;
    up.itemName = smsGroup.groupName;
    this.smsGroupList.push(up);
  }

  async fetchGroupContacts(){
    const result = await firstValueFrom(this.smsService.findAllContactgroups());
    this.groupContactList = result.data;
  }

  save(){
    
  }

  editGroupContact(groupContact:GroupContact){
    this.groupContactForm.patchValue({});
    this.groupContactForm.patchValue(groupContact);
  }

  deleteGroupContact(groupContactId:string){

  }

  clear(){}

  setupForm(){
    this.groupContactForm = this.fb.group({
      id:[null],
      contactGroupId:[null],
      smsGrupId:[null],
      smsGrup:[null],
      clientId:[null],
      client:[null],
    })
  }
}
