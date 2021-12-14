import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.scss'],
})
export class LeftSideMenuComponent implements OnInit {
  isAuth = false;

  constructor( private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logOut() {
    this.router.navigate(['login']);
    this.authService.logOutWithGoogle();
  }
}
