import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RouteService } from 'shared/route.service';

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

  constructor(private alertC: AlertController, private router: Router, private user: RouteService) { }

  ngOnInit() {
  }

  login(){

    if(!this.loginForm.valid){
      console.log('Invalid form')

    }

    //console.log(JSON.stringify(this.loginForm.value));
    this.user.login(JSON.stringify(this.loginForm.value)).subscribe(
      data=>{ console.log(data);
        this.router.navigate(['/home'])
      },
      error=>{console.error(error)
        this.showAlert();
      }
    )
  }

  async showAlert(){
    await this.alertC.create({
      header: "Incorrect data",
      message: "Your password or email are incorrect.",
      buttons: [{
        text: "Continue", handler: (res) =>{
          console.log(res)
        }
      }
      ]
  }).then(res=> res.present());
  }

}
