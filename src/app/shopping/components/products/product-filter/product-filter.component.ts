import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { DataTransformerService } from 'src/app/shared/services/helpers/data-transformer.service';
import { CategoryService } from 'src/app/shared/services/data/category.service';
import { CartItem } from 'src/app/shared/models/cart-item';
@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Input('currentCategory') currentCategory: string | null | undefined;
  @Input('cart-items') items!: CartItem[];

  categories: Category[] = [];
  subscriptions: Subscription[] = [];
  
  constructor
  (
    private categoryService: CategoryService,
    private transformer: DataTransformerService
  )
  {
    this.retrieveCategories()
  }

  retrieveCategories(): void {

    const categoryList = this.categoryService.getAll();
    const categories$ = this.transformer.toObsList(categoryList);
    const sub: Subscription =  categories$.subscribe(data => {
      this.categories = data;    
    });

    this.subscriptions.push(sub);  
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
