import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private authenticated: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.isAuthenticated().subscribe((x:boolean) => this.authenticated = x);
  }

  ngOnInit():void {
  }

  signIn():void {
    this.auth.googleSignIn();
  }
  signOut():void {
    this.auth.signOut();
    this.router.navigate(['/search']);
  }
}
