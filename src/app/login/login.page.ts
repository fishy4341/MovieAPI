import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public authenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.isAuthenticated().subscribe((x:boolean) => this.authenticated = x);
  }

  ngOnInit():void {
  }

  signIn():void {
    this.authService.googleSignIn();
  }
  signOut():void {

    this.authService.signOut();
    this.router.navigate(['/search']);
  }
}
