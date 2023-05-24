import { NgModule } from '@angular/core';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AdminProductsComponent } from './admin-products/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders/admin-orders.component';
import { AdminOrderDetailsComponent } from './admin-orders/admin-order-details/admin-order-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './admin-products/product-form/product-form.component';
import { AuthGuardService } from '../shared/services/authentication/auth-guard.service';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminOrderDetailsComponent,
    ProductFormComponent


  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'admin/orders/:id', 
        component: AdminOrderDetailsComponent, 
        canActivate: [AdminAuthGuardService] 
      },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      }    
    ])            
  ],
  providers: []
})
export class AdminModule { }
