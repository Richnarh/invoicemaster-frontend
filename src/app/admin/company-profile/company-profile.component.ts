import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { LookupService } from "src/app/services/lookup.service";
import { ToastService } from "src/app/utils/toast-service";
import { CompanyService } from "../services/company.service";
import { CompanyProfile } from "src/app/dto/Payload";
import { PageView } from "src/app/utils/page-view";
import { SweetMessage } from "src/app/utils/sweet-message";

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit{
  pageTitle:string = "Company Profile";
  profileForm:FormGroup;
  pageView:PageView = PageView.listView();

  currencyList:LookupItem[];
  profileList:CompanyProfile[];

  constructor(private lookup:LookupService,private fb:FormBuilder, private toast:ToastService, private companyService:CompanyService){}
  ngOnInit() {
    this.setupForm();
    this.initLookups();
    this. fetchProfiles();
  }

  async initLookups(){
    const result = await firstValueFrom(this.lookup.currency());
    this.currencyList = result.data;
  }
  async fetchProfiles(){
    const result = await firstValueFrom(this.companyService.profileList());
    this.profileList = result.data;
  }
  async save(){
    if(this.profileForm.invalid){
      this.toast.error("Please fill out required");
      return;
    }
    let payload = this.profileForm.value;
    const result = await firstValueFrom(this.companyService.saveProfile(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.profileList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.profileList.splice(found,1);
      }
      }
      this.profileList.push(result.data);
      this.toast.success(result.message);
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }
  editProfile(profile:CompanyProfile){
    this.profileForm.patchValue({});
    this.profileForm.controls['currency'].setValue(profile.currency);
    this.profileForm.patchValue(profile);
    this.pageView.resetToCreateView();
  }
  
  async deleteProfile(profileId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.companyService.deleteProfile(profileId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.profileList.findIndex(item => item.id === profileId);
      if(found > -1){
        this.profileList.splice(found,1);
      }
    }
  }

  clear(){
    this.profileForm.reset();
    this.profileForm.patchValue({});
  }

  setupForm(){
    this.profileForm = this.fb.group({
      id:[null],
      currency:[null],
      website:[null,Validators.required],
      companyEmail:[null, Validators.required],
      tinNo:[null],
    });
  }
}
