import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { DataTransformerService } from 'src/app/services/data-transformer.service';
import { CategoryService } from 'src/app/services/data/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  categories: Category[] = [];
  subscriptions: Subscription[] = [];
  @Input('currentCategory') currentCategory: string | null | undefined;
  
  constructor(
    private categoryService: CategoryService,
    private transformer: DataTransformerService
  ) {
    this.retrieveCategories()
  }

  retrieveCategories(): void {

    const categoryList = this.categoryService.getAll();
    const categories$ = this.transformer.toObservable(categoryList);
    const sub: Subscription =  categories$.subscribe(data => {
      this.categories = data;    
    });
    this.subscriptions.push(sub);
  
  }
}
