import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../login/auth.service';
import {SelectedMovieService} from '../../API/selected-movie.service';
import {IonItemSliding, ModalController, NavController} from '@ionic/angular';
import {MovieAPIService} from '../../API/movie-api.service';
import {FirebaseService} from '../firebase.service';
import {Router} from "@angular/router";
import {RecommendComponent} from "../recommend/recommend.component";

@Component({
  selector: 'app-seen',
  templateUrl: './seen.page.html',
  styleUrls: ['./seen.page.scss'],
})
export class SeenPage implements OnInit {
  private genres = {};
  filterText = '';
  constructor(
      private auth: AuthService,
      private selectedMovie: SelectedMovieService,
      private navController: NavController,
      private movieService: MovieAPIService,
      private firebase: FirebaseService,
      private router: Router,
      private modalController: ModalController,
  ) {


  }

  movies$;
  ngOnInit() {
    this.movies$ = this.firebase.getHasSeen();
  }


  goToMovie(movieID: number) {
    // console.log(movieID);
    // this.selectedMovie.movieId = movieID;
    // this.navController.navigateForward('details');
    this.router.navigate(['details', movieID]);
  }
  removeItem(slidingItem: IonItemSliding, movieId) {
    slidingItem.closeOpened();
    this.firebase.removeHasSeen(movieId).then(_ => {
      slidingItem.closeOpened();
    });
  }

  async recommend(slidingItem: IonItemSliding, movieID: number, title: string) {
    const modal = await this.modalController.create({
      component: RecommendComponent,
      componentProps: {movieId: movieID, title: title}
    });
    slidingItem.close();
    await modal.present();
  }
}
