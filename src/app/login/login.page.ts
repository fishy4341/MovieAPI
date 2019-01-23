import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public authenticated;

  constructor(
      private authService: AuthService,
      private router: Router,
      private auth: AuthService
  ) {
    this.auth.isAuthenticated().subscribe(x => this.authenticated = x);
  }

  ngOnInit() {
  }

  signIn() {
    this.authService.googleSignIn();
  }
  signOut() {
    this.authService.signOut();
    this.router.navigate(['/search']);
  }
}
