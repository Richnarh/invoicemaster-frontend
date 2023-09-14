import { Client } from "./Payload";
import { Base } from "./base";

export interface MessageTemplate extends Base{
    templateId:string;
    templateName:string;
    templateText:string;
}

export interface SmsGroup extends Base{
    groupId:string;
    groupName:string;
}

export interface GroupContact extends Base{
    contactGroupId:string;
    smsGrupId:string;
    smsGrup:string;
    clientId:string;
    client:string;
    phoneNumber:string;
}

export interface SmsMessage extends Base{
    clientId:string;
    smsGroupId:string;
    messageTemplateId:string;
    messagingType:string;
    textMessage:string;
    clientList:Client[];
}