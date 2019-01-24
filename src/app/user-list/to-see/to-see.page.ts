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
    this.auth.refreshUserInfo();
    console.log('checking for movies you have not seen');
    console.log(this.auth.getUserInfo());
    for(let i: number = 0; i < this.auth.getUserInfo().movieList.length; i++){
      if(!this.auth.getUserInfo().movieList[i].hasSeen){
        this.wantToSee.push(this.auth.getUserInfo().movieList[i]);
      }
    }
  }

  ngOnInit() {
  }

}
