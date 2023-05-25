import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'app-edit-product-popup',
  templateUrl: './edit-product-popup.component.html',
  styleUrls: ['./edit-product-popup.component.css']
})
export class EditProductPopupComponent extends PopupComponent{

  title = "Save Changes";
  message = "Do you want to save the changes?";

}
