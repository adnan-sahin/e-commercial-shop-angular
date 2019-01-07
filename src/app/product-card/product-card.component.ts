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
  @Input('shopping-card') shoppingCard;
  @Input('image-height') imageHeight;

 

  constructor(private shoppingCardService: ShoppingCardService) { }

  ngOnInit() { }

  addToCard() {
    this.shoppingCardService.addToCard(this.product);
  }

  removeFromCard() {
    this.shoppingCardService.removeFromCard(this.product);
  }

  getQuantity() {
    if (!this.shoppingCard || !this.shoppingCard.items) return 0;


    let item = this.shoppingCard.items[this.product.key];
    let quantity = item ? item.quantity : 0;
    return quantity;
  }
}
