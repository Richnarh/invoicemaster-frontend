import { Component, OnInit } from '@angular/core';
import { AppSessionService } from "src/app/auth/services/app-session.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  isAdmin:boolean;

  constructor(private appSession:AppSessionService){}

  ngOnInit(){
    this.isAdmin = this.appSession.checkAccess() ? true : false;
  }
}
