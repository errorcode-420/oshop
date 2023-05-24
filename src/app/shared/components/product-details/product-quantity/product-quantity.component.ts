import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCartService } from 'src/app/shared/services/data/shopping-cart.service';
import { enlargeFont, lightUp, shrinkFont } from '../../../services/animation.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
  animations: [enlargeFont, shrinkFont]
})
export class ProductQuantityComponent {
  @Input('product') product!: Product
  @Input('quantity') quantity!: number
  @Output() animationTriggered = new EventEmitter<string>();
  
  fontAnimationState = 'initial';


  constructor(
    private cartService: ShoppingCartService,
  ) {}

  addToCart() {    
    this.cartService.addToCart(this.product);    
    this.animationTriggered.emit("green");
    this.enlargeFont();
  }

  removeFromCart() { 
    this.cartService.removefromCart(this.product);   
    this.animationTriggered.emit("red");
    this.shrinkFont();
  }


  enlargeFont() {
    this.fontAnimationState = 'enlarged';
    setTimeout(() => {
      this.fontAnimationState = 'initial';
    }, 200);  
  }

  shrinkFont() {
    this.fontAnimationState = 'shrunken';
    setTimeout(() => {
      this.fontAnimationState = 'initial';
    }, 200);  
  }

}

