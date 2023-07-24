import { Component } from '@angular/core';
import { User } from "src/app/dto/Payload";
import { StorageService } from "src/app/services/storage.service";
import { LocalKeys } from "src/app/utils/LocalKeys";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  user:User;
  constructor(private storage:StorageService){
    const user = this.storage.getLocalObject(LocalKeys.CurrenUser);
    this.user = JSON.parse(user!);
  }
}
