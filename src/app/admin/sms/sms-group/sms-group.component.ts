import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "src/app/utils/toast-service";
import { SmsService } from "../services/sms.service";
import { SmsGroup } from "src/app/dto/smsPayload";
import { firstValueFrom } from "rxjs";
import { GroupFormComponent } from "../group-form/group-form.component";
import { SweetMessage } from "src/app/utils/sweet-message";

@Component({
  selector: 'app-sms-group',
  templateUrl: './sms-group.component.html',
  styleUrls: ['./sms-group.component.scss']
})
export class SmsGroupComponent implements OnInit {
  pageTitle = "SMS Group";

  @ViewChild(GroupFormComponent, { static: false })
  private groupForm: GroupFormComponent;

  smsGroupForm: FormGroup;
  smsGroup: SmsGroup;
  smsGroupList: SmsGroup[];

  constructor(private fb: FormBuilder, private toast: ToastService, private smsService: SmsService) { }

  ngOnInit(): void {
    this.setupForm();
    this.fetchGroups();
  }

  async fetchGroups() {
    const result = await firstValueFrom(this.smsService.fetchSmsGroups());
    this.smsGroupList = result.data;
  }

  pushToList(smsGroup: SmsGroup) {
    if (smsGroup.id) {
      const found = this.smsGroupList.findIndex(item => item.id === smsGroup.id);
      if (found > -1) {
        this.smsGroupList.splice(found, 1);
      }
    }
    this.smsGroupList.push(smsGroup);
  }

  editGroup(smsGroup: SmsGroup) {
    this.groupForm.editGroup(smsGroup);
  }

  async deleteGroup(groupId: string) {
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.smsService.deleteSmsGroup(groupId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.smsGroupList.findIndex(item => item.id === groupId);
      if(found > -1){
        this.smsGroupList.splice(found,1);
      }
    }
  }

  setupForm() {
    this.smsGroupForm = this.fb.group({
      id: [null],
      groupId: [null],
      groupName: [null, Validators.required],
    });
  }
}
