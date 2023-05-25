import { Component } from '@angular/core';
import { PopupComponent } from '../base-popup/popup.component';

@Component({
  selector: 'send-order-popup',
  templateUrl: './send-order-popup.component.html',
  styleUrls: ['./send-order-popup.component.css']
})
export class SendOrderPopupComponent extends PopupComponent {

  title = "Send Order";
  message = "Are you sure you want to send your order?";
  
}
