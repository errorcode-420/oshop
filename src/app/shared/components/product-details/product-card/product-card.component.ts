import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { ShoppingCartService } from '../../../services/data/shopping-cart.service';
import { ShoppingCart } from '../../../models/shopping-cart';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { fade, lightUp } from 'src/app/shared/services/animation.service';
import { CartItem } from '../../item-details/item-details.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [
    lightUp
  ]
})
export class ProductCardComponent {

  @Input('product') product!: Product | any;
  @Input('show-actions') showActions = true;
  @Input('cart-items') items: CartItem[] = [];
  animationState: string = 'end';

  get quantity() {
    let item = this.items?.[this.product.id];
    return item ? item.quantity : 0;
  }
  
  constructor(private cartService: ShoppingCartService) {}  
  
  triggerLightUp(color: string) {

    this.animationState = color + '-start';
    setTimeout(() => {
      this.animationState = color + '-end';
    }, 200);
  }

  addToCart() {    
    this.triggerLightUp('green');
    this.cartService.addToCart(this.product);  
  }
}



