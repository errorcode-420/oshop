
//import core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importiere das RouterModule und Routes
import { ReactiveFormsModule } from '@angular/forms'; // Importiere das ReactiveFormsModule

//import component modules
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';


//import  firebase
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from './firebase/firebaseConfig'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


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
import { LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Definiere die Pfade und Komponentennamen für die Routing-Module
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent }, 
  { path: 'order-success', component: OrderSuccessComponent }, 
  { path: 'my/orders', component: MyOrdersComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: MyOrdersComponent }

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
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), // Importiere das RouterModule.forRoot und füge das routes-Array hinzu
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,    
    NgbDropdown
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
