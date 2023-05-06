import { Component } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/data/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent {

  subscriptions: Subscription[] = [];
  appUser!: AppUser | null;
  cart!: any
  quantityTotal: number = 0;


  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.retrieveCart();
  }

  logout() {
    this.auth.logout();
  }


  async retrieveCart() {
    const cartObj = await this.cartService.getCart();
    const sub = cartObj
    .valueChanges()
    .subscribe(cart => {
      this.cart = cart;
      this.countItems();
    });
    
    this.subscriptions.push(sub);
  }

  private countItems() {
    if (this.cart.items) {
      let quantityTotal = 0;
      const items = this.cart.items;
      for (let key in items) {
        quantityTotal += items[key].quantity;
      }
      this.quantityTotal = quantityTotal;
    }
    else this.quantityTotal = 0;  
  }
  

}

