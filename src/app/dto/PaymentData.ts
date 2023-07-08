import { Base } from "./base";

export interface PaymentData extends Base{
   paymentCode:string;
   clientName:string;
   clientId:string;
   proformaInvoice:string;
   proformaInvoiceId:string;
   paymentMethod:string;
   deliveryStatus:string;
   paymentStatus:string;
   partialAmountPaid:number;
   totalAmount:number;
   paymentMessage:boolean;
}