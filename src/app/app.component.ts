import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FloverShopFront';
  constructor(private router: Router){
  }
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    this.router.navigate(["login"])
  }
}
