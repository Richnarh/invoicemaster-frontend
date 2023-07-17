import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LookupService } from "src/app/services/lookup.service";
import { PageView } from "src/app/utils/page-view";
import { ToastService } from "src/app/utils/toast-service";
import { CompanyService } from "../services/company.service";
import { User } from "src/app/dto/Payload";
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/dto/LookupItem";
import { SweetMessage } from "src/app/utils/sweet-message";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  pageTitle:string = "User Account";

  pageView:PageView = PageView.listView();
  branchList:LookupItem[];
  statusList:LookupItem[];
  accessLevelList:LookupItem[];
  heightList:LookupItem[];
  frameList:LookupItem[];
  widthList:LookupItem[];
  employeeList:User[];
  userForm:FormGroup;
  
  constructor(private fb:FormBuilder, private toast:ToastService, private companyService:CompanyService,private lookup:LookupService){}

  ngOnInit(){
    this.setupForm();
    this.initLookups();
    this.fetchEmployees();
  }

  async fetchEmployees() {
    const result = await firstValueFrom(this.companyService.employees());
    this.employeeList = result.data;
  }
  async initLookups(){
    const branch = await firstValueFrom(this.lookup.companyBranch());
    const access = await firstValueFrom(this.lookup.accessLevel());
    const status = await firstValueFrom(this.lookup.status());
    const units = await firstValueFrom(this.lookup.units());

    this.branchList = branch.data;
    this.statusList = status.data;
    this.accessLevelList = access.data;
    this.heightList = units.data;
    this.frameList = units.data;
    this.widthList = units.data;
  }
  async save() {
    if(this.userForm.invalid){
      this.toast.error("Please fill in requied");
      return;
    }
    let payload = this.userForm.value;
    const result = await firstValueFrom(this.companyService.saveEmployee(payload));
    if(result.success){
      if(result.data.id === payload.id){
        const found = this.employeeList.findIndex(item => item.id === result.data.id);
      if(found > -1){
        this.employeeList.splice(found,1);
      }
      }
      this.employeeList.push(result.data);
      this.toast.success(result.message);
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }
  editUser(user:User) {
    this.userForm.patchValue({});
    this.userForm.controls['status'].setValue(user.status);
    this.userForm.controls['accessLevel'].setValue(user.accessLevel);
    this.userForm.controls['frame'].setValue(user.frame);
    this.userForm.controls['height'].setValue(user.height);
    this.userForm.controls['width'].setValue(user.width);
    this.userForm.patchValue(user);
    this.pageView.resetToCreateView();
  }
  async deleteUser(userId:string) {
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.companyService.deleteEmployee(userId));
    if(result.data){
      this.toast.success(result.message);
      const found = this.employeeList.findIndex(item => item.id === userId);
      if(found > -1){
        this.employeeList.splice(found,1);
      }
    }
  }
  clearPage() {
    this.userForm.reset();
    this.userForm.patchValue({});
  }
  closePage() {
    this.userForm.reset();
    this.userForm.patchValue({});
    this.pageView.resetToListView();
  }
  initUser() {
    this.userForm.reset();
    this.userForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  setupForm() {
    this.userForm = this.fb.group({ 
      id:[null],
      companyBranchId:[null, Validators.required],
      fullname:[null, Validators.required],
      phoneNumber:[null],
      email:[null],
      status:[null],
      accessLevel:[null],
      frame:[null],
      height:[null],
      width:[null],
      password:[null],
      appVersion:[null],
    });
  }
}
