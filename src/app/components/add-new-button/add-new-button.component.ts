import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'add-new-button',
  templateUrl: './add-new-button.component.html',
  styleUrls: ['./add-new-button.component.scss']
})
export class AddNewButtonComponent {
  @Input() textTitle = "Add new";
  @Output() evtListener = new EventEmitter<void>();

  fireEvent(){
    this.evtListener.emit();
  }
}
