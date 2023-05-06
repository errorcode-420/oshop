import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/data/shopping-cart.service';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor(private shoppingCartService: ShoppingCartService) {

  }

 
}
