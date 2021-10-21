import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bouquet } from '../models/bouqet';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-addbouquet',
  templateUrl: './addbouquet.component.html',
  styleUrls: ['./addbouquet.component.css']
})
export class AddbouquetComponent implements OnInit {

  bouquet: Bouquet

  myForm: FormGroup
  constructor(private storeService: StoreService, private router: Router) {
    this.bouquet = new Bouquet()

    this.myForm = new FormGroup({
      "bid": new FormControl(null, [Validators.required]),
      "bname": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "bprice": new FormControl(null, [Validators.required]),
      "bquantity": new FormControl(null, [Validators.required]),
      "des": new FormControl(null, [Validators.required]),

    })
  }
   public get bid(): any {
    return this.myForm.get("bid")
   }
  public get bname(): any {
    return this.myForm.get("bname")
  }
  public get bprice(): any {
    return this.myForm.get("bprice")
  }
  public get bquantity(): any {
    return this.myForm.get("bquantity")
  }
  public get des(): any {
    return this.myForm.get("des")
  }

  addToShop() {
    console.log("From the reister component");

    console.log(this.bouquet);
    console.log("-------------------------");
    let item :Bouquet
    if (this.myForm.valid) {
      this.bouquet.id = this.bid.value;
      this.bouquet.name = this.bname.value;
      this.bouquet.price = this.bprice.value;
      this.bouquet.quantity = this.bquantity.value;
      this.bouquet.description = this.des.value;
    
      this.storeService.getBouquetIdAPI(this.bid.value).subscribe((data=>{
        item = data as Bouquet
        if (item==null) {
          this.bouquet.id=0
          this.storeService.addNewBouquetAPI(this.bouquet).subscribe((data) => {
            var bouquet: Bouquet = data as Bouquet
            console.log(bouquet);
            this.router.navigate(["shop"])
          })
        }else{
          this.bouquet.quantity = +this.bouquet.quantity + +item.quantity 
          this.storeService.updateBouquetAPI(this.bouquet, this.bouquet.name).subscribe((data) => {
            var bouquet: Bouquet = data as Bouquet
            console.log(bouquet);
            this.router.navigate(["shop"])
          })
        }
        
      }))
   
    }
  }

  ngOnInit(): void {
  }

}
