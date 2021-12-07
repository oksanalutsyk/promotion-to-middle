import { Component } from '@angular/core';
import { TestAuthService } from './modules/core/test-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'promotion-to-middle';
  //TO DO
  isLoggedIn = true;

  constructor(private testAuthService: TestAuthService){
    this.testAuthService.$authenticationState.subscribe(data=> {
      console.log('UPDATED', data);
      this.isLoggedIn = data
    })
  }
}
