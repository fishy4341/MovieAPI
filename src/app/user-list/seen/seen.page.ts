import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../login/auth.service";
import {Movie} from "../../shared/movie";
import {SelectedMovieService} from "../../API/selected-movie.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-seen',
  templateUrl: './seen.page.html',
  styleUrls: ['./seen.page.scss'],
})
export class SeenPage implements OnInit {
  private seenBefore: Movie[] = [];
  constructor(
      private auth: AuthService,
      private selectedMovie: SelectedMovieService,
      private navController: NavController
  ) {
    this.auth.refreshUserInfo();
    for(let i: number = 0; i < this.auth.getUserInfo().movieList.length; i++){
      if(this.auth.getUserInfo().movieList[i].hasSeen){
        console.log(`adding: ${this.auth.getUserInfo().movieList[i].title}`);
        this.seenBefore.push(this.auth.getUserInfo().movieList[i]);
      }}
  }

  ngOnInit() {
  }

  goToMovie(movieID: number){
    this.selectedMovie.movieId = movieID;
    this.navController.navigateForward('details');
  }

}
