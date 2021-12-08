import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestAuthService } from '../core/test-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private testAuthService: TestAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logIn() {
    this.testAuthService.logIn(false);
    this.router.navigate(['/dashboard']);
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}
