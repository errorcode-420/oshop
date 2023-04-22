import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, NgModel, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { CustomValidators } from 'ng2-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy {
  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  categories$;
  productForm!: FormGroup;
  submitted = false;
  private productSubscription!: Subscription;
  product: any = {};
  id: string;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private categoryService: CategoryService,
      private fb: FormBuilder,
      private productService: ProductService,
    ){
      this.categories$ = categoryService.getCategories();
      this.id = this.route.snapshot.params['key'];
      if (this.id) {    
        this.getCurrentProduct(this.id);
      }
      this.createProductForm();
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
    //const product = this.productForm.value;
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['admin/products']);
  }

  delete(product: Product) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
    
  }

  getCurrentProduct(id: string) {

    
    console.log("id");
    console.log(id);

    this.productService.getById(id).valueChanges().subscribe(
      (product: Product | null) => {
        if (product) {
          this.product = product;
        }
      }
    );
  }

  //get form-controls
  get fc(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  
}

