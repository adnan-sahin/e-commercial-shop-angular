import { Product } from './models/product';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('products')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(p => {
            const key = p.payload.key;
            const data = p.payload.val() as Product;
            return { key, ...data };
          })
        )
      );
  }

  get(productId) {
    return this.db
      .object('/products/' + productId)
      .snapshotChanges()
      .pipe(
        map(actions => {
          const key = actions.payload.key;
          const data = actions.payload.val();
          return { key, ...data };
        })
      );
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
