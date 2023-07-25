import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppConfig } from "src/app/dto/Payload";
import { ToastService } from "src/app/utils/toast-service";
import { CompanyService } from "../services/company.service";
import { firstValueFrom } from "rxjs";
import { SweetMessage } from "src/app/utils/sweet-message";

@Component({
  selector: 'app-appconfig',
  templateUrl: './appconfig.component.html',
  styleUrls: ['./appconfig.component.scss']
})
export class AppconfigComponent implements OnInit{
  pageTitle:string = "Application Configuration";
  appConfigForm:FormGroup;
  appConfigList:AppConfig[];
  
  constructor(private fb:FormBuilder, private toast:ToastService, private companyService:CompanyService){}

  ngOnInit() {
    this.setupForm();
    this.fetchAppConfig();
  }

  async fetchAppConfig() {
    const result = await firstValueFrom(this.companyService.appConfigList());
    console.log("result: ", result)
    this.appConfigList = result.data;
  }

  async save(){
    if(this.appConfigForm.invalid){
      this.toast.error("Please fill out required fields");
      return;
    }
    let payload = this.appConfigForm.getRawValue();
    const result = await firstValueFrom(this.companyService.saveAppConfig(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.appConfigList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.appConfigList.splice(found,1);
      }
      }
      this.appConfigList.push(result.data);
      this.toast.success(result.message);
      this.clear();
    }else{
      this.toast.error(result.message);
    }
  }
  editAppConfig(appConfig:AppConfig){
    this.appConfigForm.patchValue({});
    this.appConfigForm.controls["configName"].disable();
    this.appConfigForm.patchValue(appConfig);
  }
  
  async deleteAppConfig(appConfigId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.companyService.deleteAppConfig(appConfigId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.appConfigList.findIndex(item => item.id === appConfigId);
      if(found > -1){
        this.appConfigList.splice(found,1);
      }
    }
  }

  clear(){
    this.appConfigForm.reset();
    this.appConfigForm.controls["configName"].enable();
    this.appConfigForm.patchValue({});
  }
  setupForm() {
    this.appConfigForm = this.fb.group({
      id:[null],
      configName:[null, Validators.required],
      configValue:[null, Validators.required],
      configStatus:[null],
    });
  }

}
