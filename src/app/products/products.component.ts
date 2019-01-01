import { switchMap, concatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories$;
  selectedCategory: string;

  filteredProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.route.queryParamMap
      .pipe(
        switchMap(params => {
          this.selectedCategory = params.get('category');
          return this.productService.getAll();
        })
      )
      .subscribe(products => {
        this.products = products;
        this.filteredProducts = this.selectedCategory
          ? this.products.filter(p => p.category == this.selectedCategory)
          : this.products;
      });

  }
}
