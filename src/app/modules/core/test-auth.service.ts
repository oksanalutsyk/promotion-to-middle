import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class TestAuthService {

  constructor( private socialAuthService: SocialAuthService, private router: Router) {}

  logOutWithGoogle(): void {
    this.socialAuthService.signOut();
  }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
