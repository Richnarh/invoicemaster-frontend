import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { Client } from "src/app/dto/Payload";
import { LookupService } from "src/app/services/lookup.service";
import { PageView } from "src/app/utils/page-view";
import { ToastService } from "src/app/utils/toast-service";
import { ClientService } from "../services/client.service";
import { SweetMessage } from "src/app/utils/sweet-message";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit{
  @BlockUI('loading') loading: NgBlockUI;
  clientTypeList:LookupItem[];
  pageTitle:string = "Client";
  pageView:PageView = PageView.listView();

  filterText:string;
  clientForm:FormGroup;
  clientList:Client[];

  loadContent:boolean;

  constructor(private fb:FormBuilder, private lookup:LookupService, private clientService:ClientService,private toast:ToastService){}

  ngOnInit(){
    this.setupForm();
    this.initLookups();
  }

  initClient(){
    this.clientForm.reset();
    this.clientForm.patchValue({});
    this.pageView.resetToCreateView();
  }

  async initLookups(){
    const result = await firstValueFrom(this.lookup.clientType());
    this.clientTypeList = result.data;
  }

  async fetchClient(){
    this.loadContent = true;
    const result = await firstValueFrom(this.clientService.fetchAllclients());
    this.clientList = result.data;
    this.loadContent = false;
  }

  async save() {
    if(this.clientForm.invalid){
      this.toast.error("Please fill out required fields");
      return;
    }
    let payload = this.clientForm.value;
    const result = await firstValueFrom(this.clientService.save(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.clientList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.clientList.splice(found,1);
      }
      }
      this.clientList.push(result.data);
      this.toast.success(result.message);
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }

  editClient(client:Client){
    this.clientForm.patchValue({});
    this.clientForm.controls['clientType'].setValue(client.clientType);
    this.clientForm.patchValue(client);
    this.pageView.resetToCreateView();
  }
  async deleteClient(clientId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.clientService.delete(clientId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.clientList.findIndex(item => item.id === clientId);
      if(found > -1){
        this.clientList.splice(found,1);
      }
    }
  }

  clearPage() {
    this.clientForm.reset();
    this.clientForm.patchValue({});
  }
  closePage(){
    this.clientForm.reset();
    this.clientForm.patchValue({});
    this.pageView.resetToListView();
  }

  setupForm() {
    this.clientForm = this.fb.group({
      id:[null],
      clientCode:[null],
      clientName:[null, Validators.required],
      businessName:[null],
      clientType:[null, Validators.required],
      phone:[null, Validators.required],
      emailAddress:[null],
      address:[null],
      description:[null],
    })
  }
}
