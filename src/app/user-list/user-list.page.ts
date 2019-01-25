import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {Movie} from "../shared/movie";
import {AuthService} from "../login/auth.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  // private wantToSee: Movie[] = [];
  //   // private seenBefore: Movie[] = [];

  constructor(
      private firebase: FirebaseService,
      private auth: AuthService
  ) {
    // console.log('user info is: ');
    // console.log(this.auth.getUserInfo());
    // for(let i: number = 0; i < this.auth.getUserInfo().movieList.length; i++){
    //   if(this.auth.getUserInfo().movieList[i].hasSeen){
    //     this.seenBefore.push(this.auth.getUserInfo().movieList[i]);
    //   }
    //   else{
    //     this.wantToSee.push(this.auth.getUserInfo().movieList[i]);
    //   }
    // }
  }

  ngOnInit() {
  }



}
