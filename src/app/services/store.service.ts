import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bouquet } from '../models/bouqet';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  addNewBouquetAPI(bouqet: Bouquet) {
       return this.httpClient.post("http://localhost:37662/api/Shop", bouqet,{headers:this.getHeaders()})
  }
  getAllBouquetAPI() {
      return this.httpClient.get("http://localhost:37662/api/Shop",{headers:this.getHeaders()})
  }
  getBouquetIdAPI(id: string) {
    console.log("from the service getBouquetIdAPI");
    console.log("---------------------");
    return this.httpClient.get("http://localhost:37662/api/Shop/"+id,{headers:this.getHeaders()})
  }
  updateBouquetAPI(bouqet: Bouquet, id:string) {
    console.log("from the service updateBouquetAPI");
    console.log(bouqet);
    console.log("---------------------");
    return this.httpClient.put("http://localhost:37662/api/Shop/"+id, bouqet,{headers:this.getHeaders()})
  }
  private getHeaders(){
    var header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token")?.toString()
    })
    return header
  }
}

