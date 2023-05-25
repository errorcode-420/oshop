import { CartItem } from './cart-item';

export class ShoppingCart {
  id?: string;
  creationDate: any;
  items: CartItem[] = [];

}

export function getTotalCount(items: CartItem[]): number{

  
  let quantityTotal = 0;
  if (items) {
      for (let key in items) {
        quantityTotal += items[key].quantity;
      }
  }
  return quantityTotal;
    
}
