import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupItem } from 'src/app/dto/LookupItem';
import { TaxService } from '../services/tax.service';
import { firstValueFrom } from 'rxjs';
import { Tax, TaxGroup } from 'src/app/dto/Payload';
import { ToastService } from 'src/app/utils/toast-service';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { LookupService } from 'src/app/services/lookup.service';
import { TaxComponent } from '../tax/tax.component';

@Component({
  selector: 'app-tax-management',
  templateUrl: './tax-management.component.html',
  styleUrls: ['./tax-management.component.scss']
})
export class TaxManagementComponent implements OnInit{
  pageTitle = "Tax Management";

  taxList:Tax[];
  statusList:LookupItem[];
  taxGroupForm:FormGroup;
  taxForm:FormGroup;
  taxGroupList:TaxGroup[];
  taxGroup:TaxGroup;
  selectedName:string;

  constructor(private fb:FormBuilder, private taxService:TaxService, private toast:ToastService, private lookup:LookupService){}

  ngOnInit(){
    this.setupForm();
    this.setupTaxForm();
    this.initLookups();
  }

  async initLookups(){
    this.taxList = [];
    const status = await firstValueFrom(this.lookup.status());
    const result = await firstValueFrom(this.taxService.findAllTaxGroups());
    this.taxGroupList = result.data;
    this.statusList = status.data;
  }

  async selectTax(taxGroup:TaxGroup){
    this.taxGroup = taxGroup;
    this.clearTaxGroup();
    this.taxGroupForm.patchValue(taxGroup);
    this.selectedName = taxGroup.groupName;
    const result = await firstValueFrom(this.taxService.findTaxesByGroups(taxGroup.id));
    this.taxList =  result.data;
  }

  async saveTaxGroup(){
    if(this.taxGroupForm.invalid){
      this.toast.error("Please enter required fields");
      return;
    }
    const payload = this.taxGroupForm.value;
    const result = await firstValueFrom(this.taxService.saveTaxGroup(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.taxGroupList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.taxGroupList.splice(found,1);
      }
      }
      this.taxGroupList.push(result.data);
      this.toast.success(result.message);
    }else{
      this.toast.error(result.message);
    }
  }

  async saveTax(){
    if(this.taxForm.invalid){
      this.toast.error("Please enter required fields");
      return;
    }
    let payload = this.taxForm.value;
    payload.taxGroupId = this.taxGroup.id;
    const result = await firstValueFrom(this.taxService.saveTax(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.taxList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.taxList.splice(found,1);
      }
      }
      this.taxList.push(result.data);
      this.toast.success(result.message);
    }else{
      this.toast.error(result.message);
    }
  }

  editTax(tax:Tax){
    this.taxForm.reset();
    this.taxForm.patchValue({});
    this.taxForm.patchValue(tax);
  }

  async deleteTax(taxId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.taxService.deleteTax(taxId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.taxGroupList.findIndex(item => item.id === taxId);
      if(found > -1){
        this.taxGroupList.splice(found,1);
      }
    }
  }

  clearTaxGroup(){
    this.taxGroupForm.reset();
    this.taxGroupForm.patchValue({});
  }
  clearTax(){
    this.taxForm.reset();
    this.taxForm.patchValue({});
    this.taxList = [];
  }
  setupForm(){
    this.taxGroupForm = this.fb.group({
      id:[null],
      groupName:[null],
      groupStatus:[null],
      groupDescription:[null]
    });
  }

  setupTaxForm(){
    this.taxForm = this.fb.group({
      id:[null],
      taxId:[null],
      taxGroupName:[null],
      taxGroupId:[null],
      taxName:[null, Validators.required],
      taxRate:[null],
      reOrder:[null]
    });
  }
}
