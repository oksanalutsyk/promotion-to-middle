import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

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
  firebaseAPIKey = 'AIzaSyAB2s-uWN886p-uFe9X6ydS7ZnH_M4X8uU';

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private http: HttpClient
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

  signUp(email: string, password: string, name: string, age: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        this.firebaseAPIKey,
      {
        email: email,
        password: password,
        name: name,
        age: age,
        returnSecureToken: true,
      }
    );
  }

  logIn(email: string, password: string) {

    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        this.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  addUserToDB(user:any, id:string) {
    return this.http.post('https://promotion-project-d76e8-default-rtdb.firebaseio.com/users.json', {id:id,...user}).subscribe((response) => {
    });
  }



}
