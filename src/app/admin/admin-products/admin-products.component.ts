import { Product } from './../../models/product';
import { ProductService } from 'src/app/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  loading = true;

  displayedColumns: string[] = ['title', 'price', 'operations'];

  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: Product[]) {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;

    this.dataSource.filterPredicate = (data: Product, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(
          val.toLowerCase().includes(filter.value.toLowerCase())
        );
      });
      return matchFilter.every(Boolean);
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'title',
      value: filterValue
    });

    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(key: string, title: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(key);
    let snackBarRef = this.snackBar.open(`${title} product is deleted`);
  }
}
