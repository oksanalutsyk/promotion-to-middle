import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'promotion-to-middle';
  //TO DO
  isLoggedIn = true;

  constructor(private socialAuthService: SocialAuthService) {}
  
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((data) => {
      if (data) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}
