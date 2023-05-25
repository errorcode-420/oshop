import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-details/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-details/product-quantity/product-quantity.component';
import { AuthService } from './services/authentication/auth.service';
import { CategoryService } from './services/data/category.service';
import { ProductService } from './services/data/product.service';
import { DataTransformerService } from './services/helpers/data-transformer.service';
import { ShoppingCartService } from './services/data/shopping-cart.service';
import { OrderService } from './services/data/order.service';
import { UserService } from './services/data/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { PopupComponent } from '../shared/components/dialogs/base-popup/popup.component';
import { ClearCartPopupComponent } from '../shared/components/dialogs/clear-cart-popup/clear-cart-popup.component';
import { DeleteProductPopupComponent } from '../shared/components/dialogs/delete-product-popup/delete-product-popup.component';
import { SendOrderPopupComponent } from '../shared/components/dialogs/send-order-popup/send-order-popup.component';
import { AddProductPopupComponent } from '../shared/components/dialogs/add-product-popup/add-product-popup.component';
import { CancelPopupComponent } from '../shared/components/dialogs/cancel-popup/cancel-popup.component';
import { EditProductPopupComponent } from '../shared/components/dialogs/edit-product-popup/edit-product-popup.component';
import { UserViewPopupComponent } from '../shared/components/dialogs/user-view-popup/user-view-popup.component';
import { AdminViewPopupComponent } from '../shared/components/dialogs/admin-view-popup/admin-view-popup.component';
import { DeleteOrderPopupComponent } from '../shared/components/dialogs/delete-order-popup/delete-order-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsComponent } from './components/order-view/order-details/order-details.component';
import { OrderListComponent } from './components/order-view/order-list/order-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    ItemDetailsComponent,
    PopupComponent,    
    ClearCartPopupComponent,
    DeleteProductPopupComponent,
    SendOrderPopupComponent,
    AddProductPopupComponent,
    CancelPopupComponent,
    EditProductPopupComponent,
    UserViewPopupComponent,
    DeleteOrderPopupComponent,
    UserViewPopupComponent,
    AdminViewPopupComponent,
    OrderDetailsComponent,
    OrderListComponent


  ],
  imports: [
    MatIconModule,
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule, 
    MatFormFieldModule, 
    MatTableModule,    
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    BrowserAnimationsModule, 
    MatTooltipModule, 
    MatSelectModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule 
  ],
  
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    ItemDetailsComponent,
    OrderListComponent,
    OrderDetailsComponent,
    PopupComponent,
    ClearCartPopupComponent,
    DeleteProductPopupComponent,
    SendOrderPopupComponent,
    AddProductPopupComponent,
    CancelPopupComponent,
    EditProductPopupComponent,
    UserViewPopupComponent,
    DeleteOrderPopupComponent,    
    CommonModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule, 
    MatFormFieldModule, 
    MatTableModule,    
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    BrowserAnimationsModule, 
    MatTooltipModule, 
    MatSelectModule,
    DataTablesModule,
    ReactiveFormsModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    FlexLayoutModule

  ],
  providers:[
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    DataTransformerService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
