
import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'app-delete-order-popup',
  templateUrl: './delete-order-popup.component.html',
  styleUrls: ['./delete-order-popup.component.css']
})
export class DeleteOrderPopupComponent extends PopupComponent {

  title = "Delete Order";
  message = "Are you sure you want to delete this order?";
}
