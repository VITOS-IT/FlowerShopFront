import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User
  rePassword:string
  myForm:FormGroup
  constructor(private userService:UserService, private router:Router) { 
    this.user = new User()
    this.rePassword = "";
    this.myForm = new FormGroup({
      "uid":new FormControl(null,[Validators.required]),
      "pass":new FormControl(null,[Validators.required]),
    
     
    })
  }
  public get uid():any{
    return this.myForm.get("uid")
  }
  public get pass():any{
    return this.myForm.get("pass")
  }
  login(){
    console.log("From the reister component");
    
    console.log(this.user);
    console.log("-------------------------");
    
    if(this.myForm.valid)
    {
      this.user.id = this.uid.value;
      this.user.password = this.pass.value;
     
      this.userService.loginUsingAPI(this.user).subscribe((data)=>{
        var user:User = data as User;
        console.log(user.jwtToken);
        localStorage.setItem("token",user.jwtToken)
        console.log("Login");
       this.router.navigate(["shop"])
      });  
    }
  }
  ngOnInit(): void {
  }

}