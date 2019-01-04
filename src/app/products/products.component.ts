import { ShoppingCardService } from './../shopping-card.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  products: Product[] = [];
  category: string;
  card: any;

  filteredProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCardService: ShoppingCardService
  ) {}

  async ngOnInit() {
    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = this.category
          ? this.products.filter(p => p.category == this.category)
          : this.products;
      });

    this.subscription = (await this.shoppingCardService.getCard())
      .valueChanges()
      .subscribe(card => {
        this.card = card;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
