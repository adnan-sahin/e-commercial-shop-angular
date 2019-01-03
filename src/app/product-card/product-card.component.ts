import { ShoppingCardService } from '../shopping-card.service';
import { Product } from 'src/app/models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean = true;

  constructor(private shoppingCardService: ShoppingCardService) {}

  ngOnInit() {}

  addToCard(product: Product) {
    let cardId = localStorage.getItem('cardId');
    if (!cardId) {
      this.shoppingCardService.create().then(result => {
        localStorage.setItem('cardId', result.key);

        //Add product to card
      });
    } else {
      //Add product to card
    }
  }
}
