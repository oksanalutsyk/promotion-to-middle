import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<SocialUser | null>(null);
  $user = this.user.asObservable();

  constructor( private socialAuthService: SocialAuthService, private router: Router) {}

  logOutWithGoogle(): void {
    this.socialAuthService.signOut();
  }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUser(): void{
    if(this.socialAuthService.authState) {
      this.socialAuthService.authState.subscribe((user:SocialUser)=> {
        this.user.next(user)
      })
    }
    else{
      this.user.next(null)
    }
  }
 }
