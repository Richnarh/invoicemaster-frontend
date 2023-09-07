import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { User } from "src/app/dto/Payload";
import { StorageService } from 'src/app/services/storage.service';
import { LocalKeys } from 'src/app/utils/LocalKeys';

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {
  currentUser: any;
  loggedInSource = new Subject<boolean>()
  loggedIn$ = this.loggedInSource.asObservable()

  constructor(
    private storage: StorageService,
  ) { }

  public triggerLogin(isLoggedIn: boolean) {
    console.log('initialised....');
    this.loggedInSource.next(isLoggedIn)
  }

  public isLoggedIn() {
    return !!this.currentUser
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.clear();
  }

  checkAccess(){
    if(this.currentUser === undefined){
      this.currentUser = JSON.parse(this.storage.getLocalObject(LocalKeys.CurrenUser)!);
    }
    return this.currentUser !== undefined && this.currentUser?.accessLevel === "Super User";
  }

  public registerLogin(payload: User){
    this.storage.setLocalObject(LocalKeys.SessionId, btoa(payload.sessionId));
    this.storage.setLocalObject(LocalKeys.CurrenUserId, JSON.stringify(payload.id));
    this.storage.setLocalObject(LocalKeys.CurrenUser, JSON.stringify(payload));
    this.storage.setLocalObject(LocalKeys.CompanyBranchId, JSON.stringify(payload.companyBranchId));
    this.storage.setLocalObject(LocalKeys.CompanyBranch, JSON.stringify(payload.companyBranch));
    // this.storage.setLocalObject(LocalKeys.userPageData, JSON.stringify(payload.appModuleList));

    this.currentUser = payload;

    // console.log("Response: ",payload.appModuleList[0]);

    // console.log('this.storage.getToken => ', this.storage.getToken());
    // console.log('currentUser => ', this.currentUser);
  }
}

