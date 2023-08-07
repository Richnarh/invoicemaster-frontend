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

export interface Client extends Base{
    clientCode:string;
    clientName:string;
    businessName:string;
    clientType:string;
    phone:string;
    emailAddress:string;
    address:string;
    description:string;
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

export interface Invoice extends Base{
    issuedDate:Date;
    expiryDate:Date;
    client:string;
    clientId:string;
    phoneNumber:string;
    quotationNumber:string;
    totalAmount:number;
    subTotalAmount:number;
    modeOfPayment:string;
    discountRate:number;
    installationFee:number;
    description:string;
    converted:boolean;
    invoiceItemList:InvoiceItem[];
}

export interface InvoiceItem extends Base{
    itemCode:string;
    inventory:string;
    inventoryId:string;
    productName:string;
    productId:string;
    quantity:number;
    unitPrice:number;
    subTotal:number;
    description:string;
    proformaInvoice:string;
    proformaInvoiceId:string;
}

export interface Inventory extends Base{
    inventoryCode:string;
    product:string;
    productCode:string;
    productType:string;
    productId:string;
    frameSize:number;
    width:number;
    height:number;
    quantity:number;
    sellingPrice:number;
    unitPrice:number;
    description:number;
}

export interface ProductType extends Base{
    productTypeName:string;
}

export interface SalesLead extends Base{
    firstname:string;
    surname:string;
    phoneNumber:string;
    emailAddress:string;
    leadCode:string;
    houseAddress:string;
    emergencyContact:string;
    rate:number;
}

export interface AppConfig extends Base{
    configName:string;
    configValue:string;
    configStatus:string;
}