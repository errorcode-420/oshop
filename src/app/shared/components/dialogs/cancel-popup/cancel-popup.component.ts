import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'app-cancel-popup',
  templateUrl: './cancel-popup.component.html',
  styleUrls: ['./cancel-popup.component.css']
})
export class CancelPopupComponent extends PopupComponent {
  
  title = "Cancel";
  message = "Are you sure you want to cancel? All changes will be discarded.";

}
