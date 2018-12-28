import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/CustomValidator';
import { FormErrorStateMatcher } from 'src/app/validators/FormErrorStateMatcher';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product;
  id;
  productForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // FormBuilder
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, CustomValidator.urlValidator]],
      category: ['', Validators.required]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(take(2))
        .subscribe(p => {
          this.product = p;
        });
    } else {
      this.product = {};
    }
    this.categories$ = this.categoryService.getCategories();
  }

  save() {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key).markAsTouched();
      });
      return;
    }

    if (this.id) {
      this.productService.update(this.id, this.productForm.value);
    } else {
      this.productService.create(this.productForm.value);
    }
    this.router.navigate(['/admin/products']);
  }

  log(value) {
    console.log(value);
  }

  matcher = new FormErrorStateMatcher();
}
