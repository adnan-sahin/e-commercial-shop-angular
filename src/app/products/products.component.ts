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
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    const queryParamMap$ = this.route.queryParamMap;
    const products$ = this.productService.getAll();

    this.route.queryParamMap
      .pipe(
        concatMap(params => {
          this.selectedCategory = params.get('category');
          console.log(this.selectedCategory);
          return this.productService.getAll();
        })
      )
      .subscribe(products => {
        console.log(products);
        this.products = products;
        console.log(this.selectedCategory);
        this.filteredProducts = this.selectedCategory
          ? this.products.filter(p => p.category == this.selectedCategory)
          : this.products;
      });

    // this.productService.getAll().subscribe(products => {
    //   this.products = products;
    //   this.route.queryParamMap.subscribe(params => {
    //     this.selectedCategory = params.get('category');

    //     this.filteredProducts = this.selectedCategory
    //       ? this.products.filter(p => p.category == this.selectedCategory)
    //       : this.products;
    //   });
    // });
  }
}
