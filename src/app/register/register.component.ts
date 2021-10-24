import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User
  rePassword:string
  myForm:FormGroup
  constructor(private userService:UserService, private router:Router) { 
    this.user = new User()
    this.rePassword = "";
    this.myForm = new FormGroup({
      "uid":new FormControl(null,[Validators.required]),
      "pass":new FormControl(null,[Validators.required]),
      "uname":new FormControl(null,[Validators.required,Validators.minLength(3)])
     
    })
  }
  public get uid():any{
    return this.myForm.get("uid")
  }
  public get pass():any{
    return this.myForm.get("pass")
  }
  public get uname():any{
    return this.myForm.get("uname")
  }

  register(){
    console.log("From the reister component");
    
    console.log(this.user);
    console.log("-------------------------");
    
    if(this.myForm.valid)
    {
      this.user.id = this.uid.value;
      this.user.password = this.pass.value;
      this.user.name = this.uname.value;
      this.userService.registerUsingAPI(this.user).subscribe((data)=>{
        var user:User = data as User;
        //console.log(user.jwtToken);
    
        localStorage.setItem("userId",user.id)
        localStorage.setItem("token",user.jwtToken)
        console.log("register");
       this.router.navigate(["shop"])
      });  
      console.log("Unable to register")
    }
  }
  ngOnInit(): void {
  }

}
