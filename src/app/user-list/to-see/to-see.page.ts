import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../login/auth.service';
import {MovieAPIService} from '../../API/movie-api.service';
import {SelectedMovieService} from '../../API/selected-movie.service';
import {IonItemSliding, NavController} from '@ionic/angular';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-to-see',
  templateUrl: './to-see.page.html',
  styleUrls: ['./to-see.page.scss'],
})
export class ToSeePage implements OnInit {
  private genres = {};
  constructor(
      private auth: AuthService,
      private movieService: MovieAPIService,
      private selectedMovie: SelectedMovieService,
      private navController: NavController,
      private firebase: FirebaseService,
  ) {

  }

  movie$;

  ngOnInit() {
    this.movie$ = this.firebase.getToSee();
  }


  goToMovie(movieID: number) {
    this.selectedMovie.movieId = movieID;
    this.navController.navigateForward('details');
  }
  removeItem(slidingItem: IonItemSliding, movieId) {
    this.firebase.removeToSee(movieId).then(_ => {
      slidingItem.closeOpened();
    });
  }
}
