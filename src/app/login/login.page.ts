import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.email, Validators.required]),
    password: new FormControl(null,Validators.required)
  });

  constructor() { }

  ngOnInit() {
  }

  login(){

    if(!this.loginForm.valid){
      console.log('Invalid form')

    }

    console.log(JSON.stringify(this.loginForm.value));

  }

}
