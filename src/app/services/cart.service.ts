import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bouquet } from '../models/bouqet';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  addNewBouquetAPI(bouqet: Bouquet) {
       return this.httpClient.post("http://localhost:37662/api/Cart", bouqet,{headers:this.getHeaders()})
  }
  getAllBouquetAPI(userId:string) {
      return this.httpClient.get("http://localhost:37662/api/Cart/"+userId,{headers:this.getHeaders()})
  }
  getBouquetIdAPI(id: string, userId:string) {
       return this.httpClient.get("http://localhost:37662/api/Cart/"+userId+"/"+id,{headers:this.getHeaders()})
  }
  updateBouquetAPI(bouqet: Bouquet, id:string, userId:string) {
      return this.httpClient.put("http://localhost:37662/api/Cart/"+userId+"/"+id, bouqet,{headers:this.getHeaders()})
  }
  private getHeaders(){
    var header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token")?.toString()
    })
    return header
  }
}