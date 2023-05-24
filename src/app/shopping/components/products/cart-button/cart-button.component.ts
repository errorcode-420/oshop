import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart-item';
import { getTotalCount } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent {

  @Input('cart-items') items: CartItem[]= [];

  showButton = false;
  get totalCount() {
    return getTotalCount(this.items);
  }
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); // Listener hinzufügen
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true); // Listener entfernen
  }

  scroll = (): void => {
    if (window.scrollY > 50) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
