import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  title = 'promotion-to-middle';
  //TO DO
  isLoggedIn = true;

  constructor(private socialAuthService: SocialAuthService) {}

  ngOnInit(): void {
    this.subscription = this.socialAuthService.authState.subscribe((data) => {
      if (data) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
