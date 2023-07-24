import { Component } from '@angular/core';
import { User } from "src/app/dto/Payload";
import { StorageService } from "src/app/services/storage.service";
import { LocalKeys } from "src/app/utils/LocalKeys";

@Component({
  selector: 'app-welcome-layout',
  templateUrl: './welcome-layout.component.html',
  styleUrls: ['./welcome-layout.component.scss']
})
export class WelcomeLayoutComponent {
  user:User;
  constructor(private storage:StorageService){
    const user = this.storage.getLocalObject(LocalKeys.CurrenUser);
    this.user = JSON.parse(user!);
  }
}
