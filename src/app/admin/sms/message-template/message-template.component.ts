import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { MessageTemplate } from "src/app/dto/smsPayload";
import { ToastService } from "src/app/utils/toast-service";
import { SmsService } from "../services/sms.service";
import { SweetMessage } from "src/app/utils/sweet-message";

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit{
  pageTitle:string = "Message Template";

  templateForm:FormGroup;
  messageTemplateList:MessageTemplate[];
  messageTemplate:MessageTemplate;

  constructor(private fb:FormBuilder, private toast:ToastService, private smsService:SmsService){}

  ngOnInit(): void {
    this.setupForm();
    this.fetchMessageTemplates();
  }

  async fetchMessageTemplates(){
    const result = await firstValueFrom(this.smsService.fetchTemplates());
    console.log("result: ", result);
    this.messageTemplateList = result.data;
  }
  
  async save(){
    if(this.templateForm.invalid){
      this.toast.error("Please fill out requied");
      return;
    }
    let payload = this.templateForm.value;
    const result = await firstValueFrom(this.smsService.saveTemplate(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.messageTemplateList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.messageTemplateList.splice(found,1);
      }
      }
      this.messageTemplateList.push(result.data);
      this.toast.success(result.message);
    }else{
      this.toast.error(result.message);
    }
  }
  
  editTemplate(messageTemplate:MessageTemplate){
    this.templateForm.patchValue({});
    this.templateForm.patchValue(messageTemplate);
  }
  
  async deleteTemplate(templateId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.smsService.deleteTemplate(templateId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.messageTemplateList.findIndex(item => item.id === templateId);
      if(found > -1){
        this.messageTemplateList.splice(found,1);
      }
    }
  }

  clear(){
    this.templateForm.reset();
    this.templateForm.patchValue({});
  }

  setupForm() {
    this.templateForm = this.fb.group({
      id:[null],
      templateId:[null],
      templateName:[null, Validators.required],
      templateText:[null, Validators.required]
    });
  }
}
