import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';
import { LoginModule } from './modules/login/login.module';

import { AppComponent } from './app.component';

const GOOGLE_CLIENT_ID = '974582432978-h36rta581tipa8jgkt1tvtuff8epogq7.apps.googleusercontent.com';
const FACEBOOK_APP_ID = '237468001880695';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAB2s-uWN886p-uFe9X6ydS7ZnH_M4X8uU",
  authDomain: "promotion-project-d76e8.firebaseapp.com",
  databaseURL: "https://promotion-project-d76e8-default-rtdb.firebaseio.com",
  projectId: "promotion-project-d76e8",
  storageBucket: "promotion-project-d76e8.appspot.com",
  messagingSenderId: "432394685522",
  appId: "1:432394685522:web:1476ea3bad19e91725e38b",
  measurementId: "G-71QGZEWDF3"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    SocialLoginModule,
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              GOOGLE_CLIENT_ID
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(FACEBOOK_APP_ID)
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
