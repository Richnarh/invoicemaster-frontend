import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { SmsService } from "../services/sms.service";
import { ToastService } from "src/app/utils/toast-service";
import { SmsGroup } from "src/app/dto/smsPayload";
import { SmsGroupComponent } from "../sms-group/sms-group.component";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent {
  @Output() groupEvt = new EventEmitter<SmsGroup>();

  groupName:any = undefined;
  smsGroup = {} as SmsGroup;

  constructor(private smsService:SmsService, private toast:ToastService){}

  editGroup(smsGroup:SmsGroup){
    this.smsGroup = smsGroup;
    this.groupName = smsGroup.groupName;
  }

  async saveGroup(){
    if(this.groupName === undefined || this.groupName === ''){
      this.toast.error("Please enter group name");
      return;
    }
    
    this.smsGroup.groupName = this.groupName;
    const result = await firstValueFrom(this.smsService.saveGroup(this.smsGroup));
    this.groupName = undefined;
    this.groupEvt.emit(result.data);
    this.toast.success(result.message);
  }

}
