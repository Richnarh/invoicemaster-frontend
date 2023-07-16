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