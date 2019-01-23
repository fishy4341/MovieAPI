import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signIn(){
    this.authService.googleSignIn();
  }
  signOut(){
    this.authService.signOut();
  }

}
