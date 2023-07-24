import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "src/app/dto/Payload";
import { StorageService } from "src/app/services/storage.service";
import { RouteNames } from "src/app/utils/app-routes";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Input() user:User;
  appversion:string;
  loginUser:string;
  accessLevel:string;

  constructor(private storageService: StorageService,private router: Router,){}

  ngOnInit(){
    this.appversion = this.user.appVersion;
    this.loginUser = this.user.fullname;
    this.accessLevel = this.user.accessLevel;
  }

  logout(){
    this.storageService.clearToken();
    this.router.navigate([RouteNames.Login]);
  }
}
