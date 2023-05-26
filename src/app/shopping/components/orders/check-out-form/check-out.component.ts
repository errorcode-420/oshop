import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart-item';
import { ShoppingCart, getTotalCount } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/data/shopping-cart.service';
import { OrderService } from '../../../../shared/services/data/order.service';
import { Order } from '../../../../shared/models/order';
import { AuthService } from '../../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';
import { PriceService } from '../../../../shared/services/data/price.service';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../../../../shared/components/dialogs/popup'
import { ClearCartPopupComponent } from '../../../../shared/components/dialogs/clear-cart-popup/clear-cart-popup.component';
import { SendOrderPopupComponent } from '../../../../shared/components/dialogs/send-order-popup/send-order-popup.component';
import { fade } from '../../../../shared/services/animation.service';
import { DataTransformerService } from '../../../../shared/services/helpers/data-transformer.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  animations: [fade]
})
export class CheckOutFormComponent {

  @Input('priceObj') priceObj: any;

  subscriptions: Subscription[] = [];
  cart!: ShoppingCart;
  items: CartItem[] = [];
  order!: Order; 
  uid!: string;
  addressForm!: FormGroup;   

  constructor
  (
    private transformer: DataTransformerService, 
    private dialog: MatDialog,
    private cartService: ShoppingCartService, 
    private orderService: OrderService, 
    private priceService: PriceService, 
    private auth: AuthService,
    private router: Router
  )
  {
    this.retrieveCart();
    this.createProductForm();
    this.retrieveUser();
  }

  createProductForm(){
    this.addressForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Zßöäü ]*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Zßöäü ]*')]),
      street: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Zßöäü ]*')]),
      number: new FormControl('', [Validators.required, Validators.pattern('.*[0-9].*')]),
      city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Zßöäü ]*')]),
      zip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3,8}$')]),
    });
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
        .sort((a, b) => a.product.title.localeCompare(b.product.title));
    }
  } 

  retrieveUser() {
    const sub = this.auth.appUser$.subscribe(appUser => {   
      if(!appUser) return;
      this.uid = appUser.id;
    });  

    this.subscriptions.push(sub);
  }

  async clearCart() {
    const callback = () => this.cartService.clearCart(); 
    new Popup(this.dialog).create(ClearCartPopupComponent, callback);       
  }

  private async createOrder() {

    const uid = this.uid;
    const items = this.items;
    const itemsCount = getTotalCount(this.items);
    const address = this.addressForm.value;
    const priceObj = this.priceService.getSummary(items);

    const order = {
      uid: uid,
      items: items,
      address: address,
      prices: priceObj,
      itemsCount: itemsCount
    } as Order

    return await this.orderService.create(order);
  }
  
  async onSubmitForm() {  
    if (this.addressForm.valid) {   // check if form is valid

      const callback = async () => {    // this function be executed if user submits popup
        const orderId = await this.createOrder();   // create order
        this.router.navigate(['/user/orders', orderId]);    // navigate to order details
      }
      
      new Popup(this.dialog).create(SendOrderPopupComponent, callback);   // open confirmation popup         
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
