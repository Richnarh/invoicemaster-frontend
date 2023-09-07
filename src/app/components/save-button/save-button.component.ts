import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent {
  @Input() textTitle = "Save Changes";
  @Output() evtListener = new EventEmitter<void>();

  fireEvent(){
    this.evtListener.emit();
  }
}
