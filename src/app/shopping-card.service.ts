import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  constructor(private db: AngularFireDatabase) {}

  create() {
   return this.db.list('/shopping-cards').push({
      dateCreated: new Date().getTime()
    });
  }
}
