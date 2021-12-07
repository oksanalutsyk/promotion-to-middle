import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestAuthService } from '../core/test-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private testAuthService: TestAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logIn(){
    this.testAuthService.logIn(false);
    this.router.navigate(['/dashboard']);

  }
}
