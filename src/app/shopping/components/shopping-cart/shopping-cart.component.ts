import { Component } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/data/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { ShoppingCart, getTotalCount } from '../../../shared/models/shopping-cart';
import { DataTransformerService } from '../../../shared/services/helpers/data-transformer.service';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../shared/components/item-details/item-details.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../../../shared/components/dialogs/popup';
import { ClearCartPopupComponent } from '../../../shared/components/dialogs/clear-cart-popup/clear-cart-popup.component';
import {  fade, slideLeft } from '../../../shared/services/animation.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    slideLeft,
    fade
  ]
})
export class ShoppingCartComponent {

  subscriptions: Subscription[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory!: string | null;
  cart!: ShoppingCart; 
  items: CartItem[] = []; 
  animationState = 'inactive';

  get totalCount() {
    return getTotalCount(this.items);
  }

  get cartIsEmpty() {
    return !this.items ? false : this.items.length === 0;
  }
  
  constructor
  (
    private transformer: DataTransformerService, 
    private dialog: MatDialog,
    private cartService: ShoppingCartService,
    private router: Router
  )
  {
    this.retrieveCart();
  }  

  ngOnInit() {
    window.scrollTo(0, 0);
  } 
  
  async retrieveCart() {
    const cartObj = await this.cartService.getCart();
    const sub = this.transformer.toObsObj(cartObj)
      .subscribe(cart => {
        this.retrieveItems(cart);
      });
  
    this.subscriptions.push(sub);
  }
  
  private retrieveItems(cart: ShoppingCart) {
    if (!cart.items) {
      this.items = [];
    } else {
      this.items = (this.transformer.toArr(cart.items) as CartItem[])
        .sort((a, b) => a.product.title.localeCompare(b.product.title)); // Sortiere die items nach dem product.title
    }
  } 
  
  trackByFn(index: number, item: any): string {
    return item.product.id;
  }

  toCheckout() {
    this.router.navigate(['check-out']);
  }

  async clearCart() {
    const callback = () => {
      this.cartService.clearCart();
    } // Funktion als Callback erstellen

    new Popup(this.dialog).create(ClearCartPopupComponent, callback);       
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
