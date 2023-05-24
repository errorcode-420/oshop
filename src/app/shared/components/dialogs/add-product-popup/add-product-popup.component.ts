import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'app-add-product-popup',
  templateUrl: './add-product-popup.component.html',
  styleUrls: ['./add-product-popup.component.css']
})
export class AddProductPopupComponent extends PopupComponent  {

  title = "Add New Product";
  message = "Do you want to add this product to the shop?";
}
