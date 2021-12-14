import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class InnerPageGuard implements CanActivate {
  constructor(private router: Router, private socialAuthService: SocialAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !!this.socialAuthService.authState.subscribe((socialUser: SocialUser)=> {
      if(!!socialUser) {
        this.router.navigate(['dashboard']);
        return false
      }
      return true
    })
  }
  
}
