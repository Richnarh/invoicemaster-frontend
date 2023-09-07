import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppSessionService } from 'src/app/auth/services/app-session.service';
import { RouteNames } from '../utils/app-routes';
import { Observable } from "rxjs";
import { SweetMessage } from "../utils/sweet-message";
import { StorageService } from "./storage.service";
import { LocalKeys } from "../utils/LocalKeys";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {
  constructor(
    private router: Router,
    private appSession: AppSessionService,
    private storage:StorageService
  ){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    this.initUser();
    if((state.url == RouteNames.Welcome) && this.appSession.isLoggedIn()){
      return true;
    }else{
      this.router.navigate([RouteNames.Login], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.initUser();
    if((state.url == "/admin") && this.appSession.checkAccess()){
      return true;
    }
    if((state.url == "/accounts") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/branch") && this.appSession.checkAccess()){
      return true;
    }
   else if((state.url == "/profile") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/employees") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/reverse") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/transaction") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/inventory") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/product") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/product-type") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/saleslead") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/appconfig") && this.appSession.checkAccess()){
      return true;
    }
    else if((state.url == "/saleslog") && this.appSession.checkAccess()){
      return true;
    }
    else{
      // this.router.navigate([RouteNames.Login]);
      SweetMessage.error("ACCESS DENIED !!");
      return false;
    }
  }
  
  initUser(){
    let user = this.appSession.currentUser;
    if(!user){
      user = JSON.parse(this.storage.getLocalObject(LocalKeys.CurrenUser)!);
      this.appSession.registerLogin(user!);
    }
    if(!this.appSession.isLoggedIn() && user){
      this.appSession.triggerLogin(true);
    }
  }
}
