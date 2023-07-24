import { Component, Input, OnInit } from '@angular/core';
import { User } from "src/app/dto/Payload";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  @Input() user:User;
  currentBranch:string;

  ngOnInit(){
    this.currentBranch = this.user.companyBranch;
  }
}
