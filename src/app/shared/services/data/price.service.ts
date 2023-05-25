import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  
  getPriceSum(item: CartItem) {
    const priceSum = item.product.price * item.quantity;
    return priceSum;
  }

  getProductsPrice(items: CartItem[]) {
    let productsPrice = 0;
    if(!items) return 0;
    for (const item of items) {      
      productsPrice += item.product.price * item.quantity;
    }
  
    return productsPrice;
  }

  getDeliveryPrice(items: CartItem[]) {
    const productsPrice = this.getProductsPrice(items)
    if(productsPrice < 30) return 5;
    return 0;
  }

  getTotalPrice(items: CartItem[]) {
    const productsPrice = this.getProductsPrice(items);
    const deliveryPrice = this.getDeliveryPrice(items);
    const totalPrice = productsPrice + deliveryPrice;
    return totalPrice;
  }

  getSummary(items: CartItem[]) {

    const productPrice = this.getProductsPrice(items);
    const deliveryPrice = this.getDeliveryPrice(items);
    const totalPrice = this.getTotalPrice(items);

    const summary = {
      products: productPrice,
      delivery: deliveryPrice,
      total: totalPrice
    };

    return summary;
  }

}
