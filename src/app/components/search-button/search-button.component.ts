import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent {
  @Input() btnText = "Default Button";
  @Input() btnType = "button"
  @Input() iconType = "fa fa-check-circle"
  @Output() evtListener = new EventEmitter<void>();

  fireEvent(){
    this.evtListener.emit();
  }
}
