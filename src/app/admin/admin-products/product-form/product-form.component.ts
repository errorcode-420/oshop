import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/data/product.service';
import { CategoryService } from 'src/app/shared/services/data/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { DataTransformerService } from '../../../shared/services/helpers/data-transformer.service'
import { Popup } from '../../../shared/components/dialogs/popup';
import { DeleteProductPopupComponent } from '../../../shared/components/dialogs/delete-product-popup/delete-product-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProductPopupComponent } from 'src/app/shared/components/dialogs/add-product-popup/add-product-popup.component';
import { CancelPopupComponent } from '../../../shared/components/dialogs/cancel-popup/cancel-popup.component'
import { EditProductPopupComponent } from '../../../shared/components/dialogs/edit-product-popup/edit-product-popup.component';
import { fade } from 'src/app/shared/services/animation.service';
import { urlOrPathValidator } from '../../../shared/services/custom-validator.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  animations: [fade]
})
export class ProductFormComponent implements OnDestroy {

  subscriptions: Subscription[] = [];
  categories: Category[] = []; 
  productForm!: FormGroup;
  currentProduct: any = {};
  id!: string;
  
  constructor
  (
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private transformer: DataTransformerService
  )
  {
    this.retrieveCategories();
    this.id = this.route.snapshot.params['id'];
    if (this.id) {    
      this.retrieveCurrentProduct(this.id);
    }
    this.createProductForm();  
  }
    
  ngOnInit(){
    setTimeout(() => {
      this.formatPriceValue();    
    }, 1);
  }
    
  retrieveCategories(): void {

    const categoryList = this.categoryService.getAll();
    const categories$ = this.transformer.toObsList(categoryList);
    const sub =  categories$.subscribe(data => {
      this.categories = data;      
    });
    this.subscriptions.push(sub);
  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.minLength(6), urlOrPathValidator]],
    });
  }  
  
  onSubmitForm() {
    if (this.productForm.invalid) return;
    let callback;
    if(this.id) this.edit();
    else this.add();
  }

  private edit(){
    const callback = () => {
      this.productService.update(this.id, this.currentProduct);
      this.router.navigate(['admin/products']);
    }; 

    new Popup(this.dialog).create(EditProductPopupComponent, callback);
  }

  private add(){
    const callback = () =>  {
      this.productService.create(this.currentProduct);
      this.router.navigate(['admin/products']);
    };

    new Popup(this.dialog).create(AddProductPopupComponent, callback);
  }

  delete(event: Event) {
    event.preventDefault(); // Verhindert, dass 
    const callback = () => {
      this.productService.delete(this.id);
      this.router.navigate(['admin/products']);
    };

    new Popup(this.dialog).create(DeleteProductPopupComponent, callback);
  }
  
  cancel() {
    const callback = () => this.router.navigate(['admin/products']);
    new Popup(this.dialog).create(CancelPopupComponent, callback);
  }

  retrieveCurrentProduct(id: string) {
    const productObj = this.productService.getById(id);
    const sub = productObj.valueChanges()
    .subscribe(product=> {
      if(!product) return;
      this.currentProduct = product;
    });
    
    this.subscriptions.push(sub);    
  }
  
  formatPriceValue() {
    const priceControl = this.productForm.controls['price'];
  
    if (priceControl.value) {
      const formattedValue = parseFloat(priceControl.value).toFixed(2);
      priceControl.setValue(formattedValue);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }    
}

