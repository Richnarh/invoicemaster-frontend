import { Component, OnInit } from '@angular/core';
import { User } from "src/app/dto/Payload";
import { CompanyService } from "./../../admin/services/company.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit{
  usersList:User[];

  constructor(private companyService:CompanyService){}

  ngOnInit(){
    this.fetchUsers();
  }

  async fetchUsers(){
    const result = await firstValueFrom(this.companyService.employees());
    this.usersList = result.data;
  }
}
