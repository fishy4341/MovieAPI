import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {FirebaseService} from "../user-list/firebase.service";
import {User} from "../shared/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private testMe;

  constructor(
      private authService: AuthService,
      private test: FirebaseService
  ) { }

  ngOnInit() {
    this.test.retrieveUser('abc123').subscribe(result =>{
      console.log('result is');
      console.log(result);
      this.testMe = result;
    });
  }

  signIn(){
    this.authService.googleSignIn();
  }
  signOut(){
    this.authService.signOut();
  }

  testMethod():void{
    let testUser: User = {
      name: 'Jacob',
      id: 'abc123',
      movieList: []
    };

    this.test.addUser(testUser);
  }
  testMethodAgain(): void{
    console.log(this.testMe);
  }

}
