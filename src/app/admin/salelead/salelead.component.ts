import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PageView } from "src/app/utils/page-view";
import { ToastService } from "src/app/utils/toast-service";
import { CompanyService } from "../services/company.service";
import { SalesLead } from "src/app/dto/Payload";
import { firstValueFrom } from "rxjs";
import { SweetMessage } from "src/app/utils/sweet-message";

@Component({
  selector: 'app-salelead',
  templateUrl: './salelead.component.html',
  styleUrls: ['./salelead.component.scss']
})
export class SaleleadComponent implements OnInit{
  pageTitle:string = "Sales Lead";
  pageView:PageView = PageView.listView();
  salesLeadForm:FormGroup;
  salesLeadList:SalesLead[];

  constructor(private companyService:CompanyService, private fb:FormBuilder, private toast:ToastService){}


  ngOnInit(): void {
    this.setupForm();
    this.fetchSaesLeads();
  }

  async fetchSaesLeads(){
    const result = await firstValueFrom(this.companyService.salesLeadList());
    this.salesLeadList = result.data;
  }

  initSalesLead(){
    this.salesLeadForm.reset();
    this.salesLeadForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async save(){
    if(this.salesLeadForm.invalid){
      this.toast.error("Please fill out required fields");
      return;
    }
    let payload = this.salesLeadForm.value;
    const result = await firstValueFrom(this.companyService.saveSalesLead(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.salesLeadList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.salesLeadList.splice(found,1);
      }
      }
      this.salesLeadList.push(result.data);
      this.toast.success(result.message);
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }

  editSalesLead(salesLead:SalesLead){
    this.salesLeadForm.patchValue({});
    this.salesLeadForm.patchValue(salesLead);
    this.pageView.resetToCreateView();
  }

  async deleteSalesLead(salesLeadId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.companyService.deleteSalesLead(salesLeadId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.salesLeadList.findIndex(item => item.id === salesLeadId);
      if(found > -1){
        this.salesLeadList.splice(found,1);
      }
    }
  }
  clearPage() {
    this.salesLeadForm.reset();
    this.salesLeadForm.patchValue({});
  }
  closePage(){
    this.salesLeadForm.reset();
    this.salesLeadForm.patchValue({});
    this.pageView.resetToListView();
  }

  
  setupForm(){
    this.salesLeadForm = this.fb.group({
      id:[null],
      firstname:[null, Validators.required],
      surname:[null, Validators.required],
      phoneNumber:[null, Validators.required],
      emailAddress:[null],
      leadCode:[null, Validators.required],
      houseAddress:[null],
      emergencyContact:[null],
      description:[null],
      rate:[0, Validators.required],
    });
  }
}
