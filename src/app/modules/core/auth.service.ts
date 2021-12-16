import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<SocialUser | null>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null
  );
  $user = this.user.asObservable();

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {}

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

  getUser(): void {
    if (this.socialAuthService.authState) {
      this.socialAuthService.authState.subscribe((user: SocialUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          let authUser = JSON.parse(localStorage.getItem('user') || '');
          this.user.next(authUser);
        } else {
          this.user.next(null);
        }
      });
    } else {
      this.user.next(null);
    }
  }
}
