import { Component, OnInit } from '@angular/core';
import { Bouquet } from '../models/bouqet';
import { CartService } from '../services/cart.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bouquet: Bouquet
  cartItems: Bouquet[] = []
total:number=0
  constructor(private cartService: CartService, private shopService: StoreService) {
    this.bouquet = new Bouquet()
    this.cartService.getAllBouquetAPI().subscribe((data) => {
      this.cartItems = data as Bouquet[]
      this.total = this.getTotal()
    })
  }
  removeItem(item: Bouquet) {
    var bou = item
    if (item.quantity > 0) {
      bou.quantity = item.quantity - 1
      this.cartService.updateBouquetAPI(bou, bou.name).subscribe((data) => {
        this.bouquet = data as Bouquet
        console.log("buy bouquet");

      })
      this.shopService.getBouquetIdAPI(bou.name).subscribe((data) => {
        var item1 = data as Bouquet
        item1.quantity += 1
        this.shopService.updateBouquetAPI(item1, item1.name).subscribe()
      })
      this.total = this.getTotal()

    }


  }
  getTotal():number{
    let total=0;
    this.cartItems.forEach(element => {
            total +=  element.quantity * element.price
    })
    return total
  }
  ngOnInit(): void {
  }

}
