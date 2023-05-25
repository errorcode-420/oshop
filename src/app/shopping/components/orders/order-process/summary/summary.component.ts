import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart-item';
import { PriceService } from 'src/app/shared/services/data/price.service';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {

  @Input('cart-items') items!: CartItem[];

  constructor(private priceService: PriceService){}

  get productsPrice() {
    return this.priceService.getProductsPrice(this.items);
  }

  get deliveryPrice() {
    return this.priceService.getDeliveryPrice(this.items);
  }

  get totalPrice() {
    return this.priceService.getTotalPrice(this.items);
  }

  
}
