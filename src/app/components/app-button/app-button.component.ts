import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent {
  @Input() btnText = "Default Button";
  @Input() btnStyle = "btn btn-light btn-border mx-2";
  @Input() btnType = "button";
  @Input() iconType = "fa fa-check-circle"
  @Output() evtListener = new EventEmitter<void>();

  fireEvent(){
    this.evtListener.emit();
  }
}
