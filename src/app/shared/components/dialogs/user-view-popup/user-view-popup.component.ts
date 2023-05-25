import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'app-user-view-popup',
  templateUrl: './user-view-popup.component.html',
  styleUrls: ['./user-view-popup.component.css']
})
export class UserViewPopupComponent extends PopupComponent{

  title = "User View";
  message = "Do you want to switch to user view?";
}
