import { Component, Input } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { CompanyService } from "../services/company.service";
import { ToastService } from "src/app/utils/toast-service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Input() fullname:string; 
  @Input() emailAddress:string; 
  @Input() userId:string; 
  password:string;

  constructor(private companyService:CompanyService, private toast:ToastService){}

  async save(){
    if(this.userId === undefined){
      this.toast.error("Please select user");
      return;
    }
    if(this.password === undefined){
      this.toast.error("Password is required");
      return;
    }
    const result = await firstValueFrom(this.companyService.updatePassword(this.userId, this.password));
    if(result.success){
      this.toast.success(result.message);
    }
  }
}
