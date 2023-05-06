import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/data/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { of } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartService: ShoppingCartService){  
    
  }

  addToCart() {    
    this.cartService.addToCart(this.product);  
  }

  removeFromCart() {    
    this.cartService.removefromCart(this.product);  
  }
  
  get quantity() {
    let item = this.shoppingCart?.items?.[this.product.id];
    return item ? item.quantity : 0;
  }
}
