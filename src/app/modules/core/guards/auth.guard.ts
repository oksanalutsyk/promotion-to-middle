import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {SocialAuthService, SocialUser} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private socialAuthService: SocialAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !!this.socialAuthService.authState.subscribe((socialUser: SocialUser)=> {
      if(!socialUser) {
        this.router.navigate(['login']);
        return false
      }
      return true
    })
  }
}