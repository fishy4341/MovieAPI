import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import { Router } from '@angular/router';
import {FirebaseService} from '../user-list/firebase.service';
import {User} from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private testMe;

  constructor(
      private authService: AuthService,
      private router: Router,
      private test: FirebaseService
  ) { }

  ngOnInit() {
    this.test.retrieveUser('abc123').subscribe(result =>{
      console.log('result is');
      console.log(result);
      this.testMe = result;
    });
  }

  signIn() {
    this.authService.googleSignIn();
    this.router.navigate([`/search`]);
  }
  signOut() {
    this.authService.signOut();
  }

  testMethod(): void {
    const testUser: User = {
      name: 'Jacob',
      id: 'abc123',
      movieList: []
    };

    this.test.addUser(testUser);
  }
  testMethodAgain(): void {
    console.log(this.testMe);
  }

}
