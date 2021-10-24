import { Component, OnInit } from '@angular/core';
import { Bouquet } from '../models/bouqet';
import { CartBouquet } from '../models/cartItem';
import { CartService } from '../services/cart.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  bouquet: Bouquet
  storeItems: Bouquet[] = []
  userId: string = ""
  constructor(private shopService: StoreService, private cartService: CartService) {
    this.bouquet = new Bouquet()
    this.shopService.getAllBouquetAPI().subscribe((data) => {
      this.storeItems = data as Bouquet[]

    })
    if (localStorage.getItem('userId')?.toString()) {
      this.userId = localStorage.getItem('userId')!.toString()
    }
  }
  buyItem(item: Bouquet) {
    var bou = item
    if (item.quantity > 0) {
      bou.quantity = item.quantity - 1
      this.shopService.updateBouquetAPI(bou, bou.name).subscribe((data) => {
        this.bouquet = data as Bouquet
        console.log("buy bouquet");
      })
      this.cartService.getBouquetIdAPI(bou.name,this.userId).subscribe((data) => {
        var tempItem = data as CartBouquet
        if (tempItem == null) {
         let newBouquet: CartBouquet = new CartBouquet()
          newBouquet.id = 0
          newBouquet.userId=this.userId
          newBouquet.name = bou.name
          newBouquet.price = bou.price
          newBouquet.quantity = 1
          newBouquet.description = bou.description
          this.cartService.addNewBouquetAPI(newBouquet).subscribe()
        } else {
          tempItem.quantity += 1
          this.cartService.updateBouquetAPI(tempItem, tempItem.name,this.userId).subscribe()
        }
      })



    }
  }

  ngOnInit(): void {
  }
}

// this.cartService.getBouquetIdAPI(bou.id).subscribe((data => {
//   var tempItem = data as Bouquet
//   if (tempItem == null) {
//     bou.id = 0
//     this.cartService.addNewBouquetAPI(bou).subscribe((data) => {
//       var bouquet: Bouquet = data as Bouquet
//       console.log(bouquet);
//     })
//   } else {
//     tempItem.quantity += 1
//     this.cartService.updateBouquetAPI(tempItem, tempItem.id).subscribe((data) => {
//       var bouquet: Bouquet = data as Bouquet
//       console.log(bouquet);
//     })
//   }
