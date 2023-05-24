import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'delete-product-popup',
  templateUrl: './delete-product-popup.component.html',
  styleUrls: ['./delete-product-popup.component.css']
})
export class DeleteProductPopupComponent extends PopupComponent {

  title = "Delete Product";
  message = "Are you sure you want to delete this product?";
}
