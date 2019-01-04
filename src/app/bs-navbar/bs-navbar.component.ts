import { ShoppingCardService } from './../shopping-card.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ProductItem } from '../models/product-item';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  productCountInCard: number = 0;

  constructor(
    private auth: AuthService,
    private shoppingCardService: ShoppingCardService
  ) {
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  async ngOnInit() {
    let items$ = await this.shoppingCardService.getCard();
    items$.valueChanges().subscribe((result: ProductItem[]) => {
      console.log('result');
      console.log(result);

      this.productCountInCard = result
        .map(p => p.quantity)
        .reduce(function(a, b) {
          return a + b;
        });
      // result.forEach(function(value: ProductItem, index: number) {
      //   count = count + value.quantity;
      // });
    });

    // items$.then((result: ProductItem[]) => {
    //   let count = 0;
    //   result
    //     .map(i => i.quantity)
    //     .forEach(function(value, index) {
    //       count = count + value[index];
    //     });
    //   this.productCountInCard = count;
    // });
  }

  logout() {
    this.auth.logout();
  }
}
