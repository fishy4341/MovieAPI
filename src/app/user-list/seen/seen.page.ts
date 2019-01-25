import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../login/auth.service";
import {Movie} from "../../shared/movie";
import {SelectedMovieService} from "../../API/selected-movie.service";
import {NavController} from "@ionic/angular";
import {MovieAPIService} from "../../API/movie-api.service";

@Component({
  selector: 'app-seen',
  templateUrl: './seen.page.html',
  styleUrls: ['./seen.page.scss'],
})
export class SeenPage implements OnInit {
  private seenBefore: Movie[] = [];
  private searchResults;
  private genres = {};
  constructor(
      private auth: AuthService,
      private selectedMovie: SelectedMovieService,
      private navController: NavController,
      private movieService: MovieAPIService
  ) {


  }

  ngOnInit() {
    if(this.auth.getUserInfo().name === ''){
      this.auth.refreshUserInfo().subscribe(dbUserData =>{
        // @ts-ignore
        this.auth.updateUserMovieList(dbUserData.mlHasSeen, dbUserData.mlNotSeen);
        console.log('checking for movies you have not seen');
        console.log(this.auth.getUserInfo());
        this.seenBefore = this.auth.getUserInfo().mlHasSeen;
      });
    }
    else{
      this.seenBefore = this.auth.getUserInfo().mlHasSeen;
    }
  }

  goToMovie(movieID: number){
    this.selectedMovie.movieId = movieID;
    this.navController.navigateForward('details');
  }

  search(value){
    console.log(value);
    if (value === ''){
      console.log('empty!');
    }
    else{
      this.movieService.searchMovies(value).subscribe(data =>{
        this.searchResults = data['results'];
      })
    }
  }

}
