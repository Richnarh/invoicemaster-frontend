import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LookupItem } from "src/app/dto/LookupItem";
import { ToastService } from "src/app/utils/toast-service";
import { CompanyService } from "../services/company.service";
import { firstValueFrom } from "rxjs";
import { CompanyBranch } from "src/app/dto/Payload";
import { LookupService } from "src/app/services/lookup.service";
import { PageView } from "src/app/utils/page-view";
import { SweetMessage } from "src/app/utils/sweet-message";

@Component({
  selector: 'app-company-branch',
  templateUrl: './company-branch.component.html',
  styleUrls: ['./company-branch.component.scss']
})
export class CompanyBranchComponent implements OnInit{
  pageTitle:string = "Company Branch";

  pageView:PageView = PageView.listView();
  companyProfileList:LookupItem[];
  companyBranchForm:FormGroup;
  branchList: CompanyBranch[];

  constructor(private fb:FormBuilder, private toast:ToastService, private companyService:CompanyService,private lookup:LookupService){}

  ngOnInit(){
    this.setupForm();
    this.initLookups();
    this.fetchBranches();
  }

  initBranch(){
    this.companyBranchForm.reset();
    this.companyBranchForm.patchValue({});
    this.pageView.resetToCreateView();
  }

  async fetchBranches(){
    const result = await firstValueFrom(this.companyService.branchList());
    this.branchList = result.data;
  }
  async save(){
    if(this.companyBranchForm.invalid){
      this.toast.error("Branch name is requied");
      return;
    }
    let payload = this.companyBranchForm.value;
    console.log("Form Data: ", payload)
    const result = await firstValueFrom(this.companyService.save(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.branchList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.branchList.splice(found,1);
      }
      }
      this.branchList.push(result.data);
      this.toast.success(result.message);
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }

  async initLookups(){
    const profile = await firstValueFrom(this.lookup.companyProfile());
    this.companyProfileList = profile.data;
  }

  editBranch(branch:CompanyBranch){
    this.companyBranchForm.patchValue({});
    this.companyBranchForm.controls['companyProfileId'].setValue(branch.companyProfileId);
    this.companyBranchForm.patchValue(branch);
    this.pageView.resetToCreateView();
  }
  
  async deleteBranch(branchId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.companyService.deleteBranch(branchId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.branchList.findIndex(item => item.id === branchId);
      if(found > -1){
        this.branchList.splice(found,1);
      }
    }
  }

  closePage(){
    this.companyBranchForm.reset();
    this.companyBranchForm.patchValue({});
    this.pageView.resetToListView();
  }

  setupForm(){
    this.companyBranchForm = this.fb.group({
      id:[null],
      branchCode:[null],
      branchName:[null, Validators.required],
      gpsAddress:[null],
      telephoneNo:[null],
      companyProfileId:[null]
    });
  }
}
