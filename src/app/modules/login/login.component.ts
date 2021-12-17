import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SocialUser } from 'angularx-social-login';

import { AuthService } from '../core/auth.service';

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

  constructor( private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
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
    this.authService.$user.subscribe((user:SocialUser | null) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
    })
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  onSubmitSignIn() {
    this.logIn(this.signInForm.value.email, this.signInForm.value.password);
    // console.log(this.signInForm.value);

  }
  onSubmitSignUp() {
    this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.name, this.signUpForm.value.age).subscribe(
    res=> {
      this.authService.addUserToDB(this.signUpForm.value, res.localId )
      this.signUpForm.reset()
    },
    error => {
      console.log(error);
      this.signUpForm.reset()
    }
    )
    console.log(this.signUpForm.value);
  }

  onSubmitResetPassword() {
    console.log(this.resetPasswordForm.value);
  }

  logIn(email:string, password:string) {
    this.authService.logIn(email, password).subscribe(res=> {
      console.log(res);

    },
    error => {
      console.log(error)
    })
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
