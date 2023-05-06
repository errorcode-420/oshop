import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { take } from 'rxjs';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { CartItem } from 'src/app/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  dbPath: string;

  constructor(private db: AngularFireDatabase) {
    this.dbPath = '/shopping-carts/';
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, +1);
  }

  async removefromCart(product: Product) {
   this.updateItemQuantity(product, -1);
  }

  async deleteFromCart(productId: string) {
    const cartId = await this.getOrCreateCartId();
    const path = `${this.dbPath}${cartId}/items/${productId}`;
    this.db.object(path).remove();
  }

  private async updateItemQuantity(product: Product, change: number){
    const cartId = await this.getOrCreateCartId();
    if(!cartId) return;
    this.getItemByIds(cartId, product.id)
      .valueChanges()
      .pipe(take(1))
      .subscribe(item => {

        let newQuantity = (item?.quantity || 0 ) + change;
        
        if (newQuantity === 0) {
          this.deleteFromCart(product.id)
        }
        else {
          this.updateCartItem(cartId, product.id, {
            quantity: newQuantity,
            product: product
          });
        }
        
      });
  }


  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');  
    if (cartId) return cartId;
    return this.createCart()
      .then(result => {
        cartId = result.key + "";
        localStorage.setItem('cartId', cartId);      
        return cartId;
      });
  }


  private createCart(){    
    return this.db.list<ShoppingCart>(this.dbPath).push({
      creationDate: new Date().getTime(),
      items: []
    });
  }
    
  async getCart(): Promise<AngularFireObject<ShoppingCart>> { //entfernen eins
    const id = await this.getOrCreateCartId();
    const path = `${this.dbPath}${id}`;
    console.log(path);//entfernen

    return this.db.object<ShoppingCart>(path);
  }    

  getItemByIds(cartId: string, productId: string) {
    const path = `${this.dbPath}${cartId}/items/${productId}`;
    console.log(path);//entfernen

    return this.db.object<CartItem>(path);
  }    

  updateCartItem(cartId: string, productId: string, itemData: Partial<CartItem>) {
    const path = `${this.dbPath}${cartId}/items/${productId}`
    console.log(path);//entfernen
    const itemRef = this.db.object<CartItem>(path);
    return itemRef.update(itemData);
  }



}


