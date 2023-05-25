import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/data/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart, getTotalCount } from '../../../shared/models/shopping-cart';
import { UserService } from '../../../shared/services/data/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../../../shared/components/dialogs/popup';
import { AdminViewPopupComponent } from '../../../shared/components/dialogs/admin-view-popup/admin-view-popup.component';
import { UserViewPopupComponent } from '../../../shared/components/dialogs/user-view-popup/user-view-popup.component';
import { DataTransformerService } from 'src/app/shared/services/helpers/data-transformer.service';
import { CartItem } from 'src/app/shared/models/cart-item';
import { fade } from 'src/app/shared/services/animation.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  animations: [fade]
})

export class BsNavbarComponent {
  selectedNavItem: string = "home"; 
  subscriptions: Subscription[] = [];
  appUser!: AppUser | null;
  cart!: ShoppingCart; 
  items: CartItem[] = []; 

  get totalCount() {
    const items = this.items;
    return items ? getTotalCount(this.items) : 0; 
  }

  constructor
  (
    private transformer: DataTransformerService,
    private auth: AuthService,
    private cartService: ShoppingCartService,
    private userService: UserService,
    private dialog: MatDialog
  ) 
  {
    this.retrieveCart();
    this.retrieveUser();
  }
  
  logout() {
    this.auth.logout();
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
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.selectedNavItem = "home";
    });
  }
  
  switchView(view: string) {
    const uid = this.appUser?.id ? this.appUser.id : "";
    const isAdmin = this.appUser?.isAdmin;
    const switchToAdmin = view === "admin";
    if(isAdmin === switchToAdmin) return;

    const callback = () => this.userService.updateMode(uid, {isAdmin: !this.appUser?.isAdmin});
    if (isAdmin) new Popup(this.dialog).create(UserViewPopupComponent, callback);  
    else  new Popup(this.dialog).create(AdminViewPopupComponent, callback);   
  }

  @Output() closeM = new EventEmitter<void>();
  closeMenu() {
    this.closeM.emit();
  }
}

