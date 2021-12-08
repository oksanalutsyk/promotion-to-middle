import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TestAuthService } from '../core/test-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private testAuthService: TestAuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',  [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signInForm.value);
    this.logIn();
  }

  logIn() {
    this.testAuthService.logIn(false);
    this.router.navigate(['/dashboard']);
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}
