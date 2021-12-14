import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SocialAuthService, SocialUser } from 'angularx-social-login';

import { TestAuthService } from '../core/test-auth.service';

import Validation from './password-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  signInForm: FormGroup;
  signUpForm: FormGroup;
  resetPasswordForm: FormGroup;

  socialUser: SocialUser | null = null;
  isLoggedin: boolean = false;

  constructor( private testAuthService: TestAuthService, private router: Router,
               private formBuilder: FormBuilder, private socialAuthService: SocialAuthService) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.signUpForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmedPassword: ['', [Validators.required]],
        acceptTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: [Validation.match('password', 'confirmedPassword')],
      }
    );

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.subscription = this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  loginWithGoogle(): void {
    this.testAuthService.loginWithGoogle();
  }

  onSubmitSignIn() {
    console.log(this.signInForm.value);
    this.logIn();
  }
  onSubmitSignUp() {
    console.log(this.signUpForm.value);
  }

  onSubmitResetPassword() {
    console.log(this.resetPasswordForm.value);
  }

  logIn() {
    // this.testAuthService.logIn(false);
    // this.router.navigate(['/dashboard']);
  }

  getErrorMessage(data: string) {
    return 'Not a valid ' + data;
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
