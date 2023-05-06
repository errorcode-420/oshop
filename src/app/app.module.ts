//import core modules
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//import component modules
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

//import firebase
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './environment/environment';

//import components
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './services/authentication/auth.service';
import { AuthGuardService } from './services/authentication/auth-guard.service';
import { UserService } from './services/data/user.service';
import { AdminAuthGuardService } from './services/authentication/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/data/category.service';
import { ProductService } from './services/data/product.service';
import { ShoppingCartService } from './services/data/shopping-cart.service';

import { DataTransformerService } from './services/data-transformer.service';


import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';


// Definiere die Pfade und Komponentennamen für die Routing-Module
const routes: Routes = [
  

  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },

  //test table

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] }, 
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] }, 
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] }, 
 
  { 
    path: 'admin/products/new', 
    component: ProductFormComponent, 
    canActivate: [AdminAuthGuardService] 
  }, 
  { 
    path: 'admin/products/:key', 
    component: ProductFormComponent, 
    canActivate: [AdminAuthGuardService] 
  },   
  { 
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AdminAuthGuardService] 
  },
  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AdminAuthGuardService] 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),


    //test table
    DataTablesModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    


  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    DataTransformerService,
    ShoppingCartService,


  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
