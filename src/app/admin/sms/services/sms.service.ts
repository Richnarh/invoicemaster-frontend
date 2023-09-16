import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { GroupContact, MessageTemplate, SmsGroup, SmsMessage } from "src/app/dto/smsPayload";
import { ApiResponse } from "src/app/utils/apiResponse";
import { environment as env } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http:HttpClient) { }

  saveTemplate(messageTemplate:MessageTemplate) {
    if (!messageTemplate.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/message-template`, messageTemplate);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/message-template`, messageTemplate);
  }

  saveGroup(smsGroup:SmsGroup) {
    if (!smsGroup.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/sms-group`, smsGroup);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/sms-group`, smsGroup);
  }
  
  createGroupContact(groupContact:GroupContact) {
    return this.http.post<ApiResponse<any>>(`${env.endpoint}/group-contact`, groupContact);
  }

  fetchSmsGroups(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/sms-group/list`);
  }

  findAllContactgroups(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/group-contact/list`);
  }
  fetchContactByGroup(groupId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/group-contact/list/${groupId}`);
  }

  deleteSmsGroup(smsGroupId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/sms-group/${smsGroupId}`);
  }

  deleteGroupContact(groupContactId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/group-contact/${groupContactId}`);
  }

  fetchTemplates(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/message-template/list`);
  }

  fetchTemplateById(templateId: string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/message-template/${templateId}`);
  }

  deleteTemplate(templateId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/message-template/${templateId}`);
  }

  fetchClients(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/client/list`);
  }
  sendSingleSms(sms:SmsMessage){
    return this.http.post<ApiResponse<any>>(`${env.endpoint}/sms/single-message`, sms);
  }
  sendBulkSms(sms:SmsMessage){
    return this.http.post<ApiResponse<any>>(`${env.endpoint}/sms/bulk-message`, sms);
  }
}
