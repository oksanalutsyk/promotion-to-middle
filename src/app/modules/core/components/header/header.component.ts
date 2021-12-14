import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  userName = '';
  userAvatar = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.subscription = this.authService.$user.subscribe(
      (user: SocialUser | null) => {
        if (user) {
          this.userName = user?.name;
          this.userAvatar = user?.photoUrl;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
