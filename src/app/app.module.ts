import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider,} from 'angularx-social-login';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouteService} from '../../shared/route.service' 

@NgModule({

  declarations: [AppComponent],

  entryComponents: [],

  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,SocialLoginModule],

  providers: [

    {

      provide: 'SocialAuthServiceConfig',

      useValue: {

        autoLogin: false,

        providers: [

          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '264741356645-k2fsij4vccf1t4on6tf46phe0bd3h70e.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3442791689092520'),
          },
        ],
      } as SocialAuthServiceConfig,
      
    },
    RouteService,

    StatusBar,
    
    SplashScreen,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],

  bootstrap: [AppComponent]
})

export class AppModule {}
