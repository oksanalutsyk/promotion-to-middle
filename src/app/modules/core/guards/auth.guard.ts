import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService:AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !!this.authService.$user.subscribe((socialUser: SocialUser | null) => {
      if(!socialUser) {
        this.router.navigate(['login']);
        return false
      }
      return true
    })
  }
}