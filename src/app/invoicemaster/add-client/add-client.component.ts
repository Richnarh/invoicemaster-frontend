import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { LookupService } from "src/app/services/lookup.service";
import { ToastService } from "src/app/utils/toast-service";
import { ClientService } from "../services/client.service";
import { LookupItem } from "src/app/dto/LookupItem";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit{
  clientForm:FormGroup;
  clientTypeList:LookupItem[];

  constructor(private fb:FormBuilder, private lookup:LookupService, private clientService:ClientService,private toast:ToastService){}

  ngOnInit(){
    this.setupForm();
    this.initLookups();
  }
  
  async initLookups(){
    const result = await firstValueFrom(this.lookup.clientType());
    this.clientTypeList = result.data;
  }

  async save() {
    if(this.clientForm.invalid){
      this.toast.error("Please fill out required fields");
      return;
    }
    let payload = this.clientForm.value;
    const result = await firstValueFrom(this.clientService.save(payload));
    if(result.success){
      this.toast.success(result.message);
    }else{
      this.toast.error(result.message);
    }
  }

  clearPage(){

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
