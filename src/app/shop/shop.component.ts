import { Component, OnInit } from '@angular/core';
import { Bouquet } from '../models/bouqet';
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

  constructor(private shopService: StoreService, private cartService: CartService) {
    this.bouquet = new Bouquet()
    this.shopService.getAllBouquetAPI().subscribe((data) => {
      this.storeItems = data as Bouquet[]
    })
  }
  buyItem(item: Bouquet) {
    var bou = item
    if (item.quantity > 0) {
      bou.quantity = item.quantity - 1
      this.shopService.updateBouquetAPI(bou, bou.name).subscribe((data) => {
        this.bouquet = data as Bouquet
        console.log("buy bouquet");
      })
      this.cartService.getBouquetIdAPI(bou.name).subscribe((data)=>{
        var tempItem = data as Bouquet
        if (tempItem == null) {
         this.bouquet.id=0
         this.bouquet.name=bou.name
         this.bouquet.price = bou.price
         this.bouquet.quantity = 1
         this.bouquet.description = bou.description
          this.cartService.addNewBouquetAPI(this.bouquet).subscribe()
        }else{
          tempItem.quantity +=1
          this.cartService.updateBouquetAPI(tempItem, tempItem.name).subscribe()
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
