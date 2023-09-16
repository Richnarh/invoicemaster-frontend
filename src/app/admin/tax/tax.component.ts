import { Component, OnInit } from '@angular/core';
import { Tax } from 'src/app/dto/Payload';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  taxList:Tax[];
  constructor() { }

  ngOnInit() {
  }

  push(taxes:Tax[]){
    this.taxList = taxes;
  }
}
