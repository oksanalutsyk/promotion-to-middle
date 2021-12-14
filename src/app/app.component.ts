import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SocialUser } from 'angularx-social-login';

import { AuthService } from './modules/core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  title = 'promotion-to-middle';
  //TO DO
  isLoggedIn = false;

  constructor( private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser();

    this.authService.$user.subscribe((user: SocialUser | null) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
