import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../login/auth.service";
import {Movie} from "../../shared/movie";

@Component({
  selector: 'app-to-see',
  templateUrl: './to-see.page.html',
  styleUrls: ['./to-see.page.scss'],
})
export class ToSeePage implements OnInit {
  private wantToSee: Movie[] = [];
  constructor(
      private auth: AuthService
  ) {

  }

  ngOnInit() {
    if(this.auth.getUserInfo().name === ''){
      this.auth.refreshUserInfo().subscribe(dbUserData =>{
        // @ts-ignore
        this.auth.updateUserMovieList(dbUserData.mlHasSeen, dbUserData.mlNotSeen);
        console.log('checking for movies you have not seen');
        console.log(this.auth.getUserInfo());
        this.wantToSee = this.auth.getUserInfo().mlNotSeen;
      });
    }
    else{
      this.wantToSee = this.auth.getUserInfo().mlNotSeen;
    }
  }

}
