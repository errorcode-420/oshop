//import core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

//import component modules
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

//import firebase
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
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
import { DatabaseTestComponent } from './database-test/database-test.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

// Definiere die Pfade und Komponentennamen für die Routing-Module
const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },

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
    DatabaseTestComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideDatabase(() => getDatabase()),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //CustomFormsModule

    


  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
