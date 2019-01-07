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



    items$.valueChanges().subscribe((result) => {
      console.log('result');
      if (result && result['items']!=null) {
        let items = result['items'];
        console.log(items)
        this.productCountInCard = Object.keys(items).map(key => items[key]).map(key => key.quantity).reduce((a, b) => { return a + b; })
      }

    });


  }

  logout() {
    this.auth.logout();
  }
}
