import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent {
  @Input() textTitle = "Search";
  @Input() btnStyle = "btn btn-light btn-border mx-2";
  @Input() btnType = "button";
  @Output() evtListener = new EventEmitter<void>();

  fireEvent(){
    this.evtListener.emit();
  }
}
