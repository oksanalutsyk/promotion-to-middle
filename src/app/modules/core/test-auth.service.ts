import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestAuthService {

  $authenticationState = new BehaviorSubject<boolean>(false);

  isAuth:boolean = false;

  constructor(private socialAuthService: SocialAuthService) { }


  logOutWithGoogle(): void {
    this.socialAuthService.signOut();
    this.$authenticationState.next(false);
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.$authenticationState.next(true)

  }


  // logIn(data:boolean):Observable<any>{
  //   this.isAuth = !data;
  //   this.$authenticationState.next(this.isAuth);
  //   return of(!data)
  // }

  getAuthState():Observable<any> {
    return of(this.isAuth)
  }

}
