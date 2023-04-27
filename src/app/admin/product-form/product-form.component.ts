import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, NgModel, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/data/product.service';
import { CategoryService } from 'src/app/services/data/category.service';
import { CustomValidators } from 'ng2-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DataTransformerService } from '../../services/data-transformer.service'

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy {

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }



  subscriptions: Subscription[] = [];
  categories: Category[] = []; 
  productForm!: FormGroup;
  product: any = {};
  id!: string;

  constructor
  (
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private transformer: DataTransformerService
  ){this.constructorFunction()}

  private constructorFunction(){
    this.retrieveCategories();
    this.id = this.route.snapshot.params['key'];
    if (this.id) {    
      this.retrieveCurrentProduct(this.id);
    }
    this.createProductForm();
  }
  
    
  retrieveCategories(): void {

    const categoryList = this.categoryService.getAll();
    const categories$ = this.transformer.toObservable(categoryList);
    const sub =  categories$.subscribe(data => {
      this.categories = data;
    })
    this.subscriptions.push(sub);
  }

  createProductForm(){
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      category: ['', Validators.required],
      url: ['', [Validators.required, Validators.minLength(6), CustomValidators.url]],
    });
  }

  save(product: Product) {
    
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['admin/products']);
  }

  delete(product: Product) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
    
  }

  retrieveCurrentProduct(id: string) {
    const sub = this.productService.getById(id).valueChanges().subscribe(product=> this.product = product);
    this.subscriptions.push(sub);
  }

  //get form-controls
  get fc(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  
}

