import { Base } from "./base";

export interface Product extends Base{
    productName:string;
    productCode:string;
    productType:string;
    productTypeId:string;
    reorderLevel:number;
    productImage:string;
    imageFormat:string;
    description:string;
}

export interface PaymentData extends Base{
   paymentCode:string;
   clientName:string;
   clientId:string;
   proformaInvoice:string;
   proformaInvoiceId:string;
   paymentMethod:string;
   deliveryStatus:string;
   deliveryAdress:string;
   paymentStatus:string;
   partialAmountPaid:number;
   totalAmount:number;
   paymentMessage:boolean;
}

export interface CompanyBranch extends Base{
    branchCode:string;
    branchName:string;
    gpsAddress:string;
    telephoneNo:string;
    companyProfile:string;
    companyProfileId:string;
}

export interface CompanyProfile extends Base{
    currency:string;
    website:string;
    companyEmail:string;
    tinNo:string;
}

export interface User extends Base{
    sessionId:string;
    companyBranch:string;
    companyBranchId:string;
    userId:string;
    fullname:string;
    phoneNumber:string;
    email:string;
    status:string;
    accessLevel:string;
    frame:string;
    height:string;
    width:string;
    password:string;
    appVersion:string;
    appModuleList:AppModule[];
}

export interface AppModule{
    moduleId:string;
    moduleName:string;
    userPageData:UserPage[];
}

export interface UserPage{
    pageId:string;
    pageName:string;
    userActivePage:boolean;
}