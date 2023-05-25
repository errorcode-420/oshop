import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'clear-cart-popup',
  templateUrl: './clear-cart-popup.component.html',
  styleUrls: ['./clear-cart-popup.component.css']
})
export class ClearCartPopupComponent extends PopupComponent {

  title = "Clear Shopping Cart";
  message = "Are you sure you want to clear your shopping cart?";
}
