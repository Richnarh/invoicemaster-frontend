import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppSessionService } from "src/app/auth/services/app-session.service";
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
  isAdmin:boolean;

  constructor(private storageService: StorageService,private router: Router, private appSession:AppSessionService){}

  ngOnInit(){
    this.appversion = this.user.appVersion;
    this.loginUser = this.user.fullname;
    this.accessLevel = this.user.accessLevel;

    this.isAdmin = this.appSession.checkAccess() ? true : false;
  }

  logout(){
    this.storageService.clearToken();
    this.router.navigate([RouteNames.Login]);
  }
}
