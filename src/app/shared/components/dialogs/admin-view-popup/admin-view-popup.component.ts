import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'app-admin-view-popup',
  templateUrl: './admin-view-popup.component.html',
  styleUrls: ['./admin-view-popup.component.css']
})
export class AdminViewPopupComponent extends PopupComponent{

  title = "Admin View";
  message = "Do you want to switch to admin view?";
}
