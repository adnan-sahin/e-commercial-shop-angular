import { take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { ProductItem } from './models/product-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-cards').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCard() {
    let cardId = await this.getOrCreateCardId();
    return this.db.object('/shopping-cards/' + cardId);
  }

  private getItem(cardId: string, productId: string) {
    return this.db.object('/shopping-cards/' + cardId + '/items/' + productId);
  }

  private async getOrCreateCardId(): Promise<string> {
    let cardId = localStorage.getItem('cardId');
    if (cardId) return cardId;

    let result = await this.create();
    localStorage.setItem('cardId', result.key);
    return result.key;
  }

  addToCard(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCard(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cardId = await this.getOrCreateCardId();
    let item$ = this.getItem(cardId, product.key);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: ProductItem) => {
        item$.update({
          product: product,
          quantity: (item ? item.quantity : 0) + change
        });
      });
  }
}
