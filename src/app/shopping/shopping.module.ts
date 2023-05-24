import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from "../shared/shared.module";
import { DeliveryDateComponent } from './components/orders/order-process/delivery-date/delivery-date.component';
import { PaymentMethodsComponent } from './components/orders/order-process/payment-methods/payment-methods.component';
import { SummaryComponent } from './components/orders/order-process/summary/summary.component';
import { CartButtonComponent } from './components/products/cart-button/cart-button.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { EmptyCartComponent } from './components/shopping-cart/empty-cart/empty-cart.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutFormComponent } from './components/orders/check-out-form/check-out.component';
import { AuthGuardService } from '../shared/services/authentication/auth-guard.service';
import { UserOrdersComponent } from './components/orders/user-orders/user-orders/user-orders.component';
import { UserOrderDetailsComponent } from './components/orders/user-orders/user-order-details/user-order-details.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    DeliveryDateComponent,
    PaymentMethodsComponent,
    SummaryComponent,
    CartButtonComponent,
    ProductFilterComponent,
    EmptyCartComponent,
    ProductsComponent,
    UserOrdersComponent,
    UserOrderDetailsComponent,
    CheckOutFormComponent

  ],
  imports: [
    SharedModule, 
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutFormComponent, canActivate: [AuthGuardService] },
      { path: 'user/orders/:id', component: UserOrderDetailsComponent, canActivate: [AuthGuardService] },
      { path: 'user/orders', component: UserOrdersComponent, canActivate: [AuthGuardService] },
    ])
  ],
  providers: []    
})
export class ShoppingModule { }
