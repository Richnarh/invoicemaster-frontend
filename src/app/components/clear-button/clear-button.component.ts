import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.scss']
})
export class ClearButtonComponent {
  @Output() evtListener = new EventEmitter<void>();

  fireEvent(){
    this.evtListener.emit();
  }
}
