import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestAuthService {

  $authenticationState = new BehaviorSubject<boolean>(false);

  isAuth:boolean = false;

  constructor() { }

  logIn(data:boolean):Observable<any>{
    this.isAuth = !data;
    this.$authenticationState.next(this.isAuth);
    return of(!data)
  }

  getAuthState():Observable<any> {
    return of(this.isAuth)
  }

}
