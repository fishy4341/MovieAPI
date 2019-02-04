import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../login/auth.service';
import {MovieAPIService} from '../../API/movie-api.service';
import {SelectedMovieService} from '../../API/selected-movie.service';
import {IonItemSliding, LoadingController, ModalController, NavController} from '@ionic/angular';
import {FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';
import {RecommendComponent} from '../recommend/recommend.component';

@Component({
  selector: 'app-to-see',
  templateUrl: './to-see.page.html',
  styleUrls: ['./to-see.page.scss'],
})
export class ToSeePage implements OnInit {
  private genres = {};
  filterText = '';
  constructor(
      private auth: AuthService,
      private movieService: MovieAPIService,
      private selectedMovie: SelectedMovieService,
      private navController: NavController,
      private firebase: FirebaseService,
      private router: Router,
      private modalController: ModalController,
      private loader: LoadingController
  ) {

  }

  movie$;

  ngOnInit() {
    this.movie$ = this.firebase.getToSee();
  }


  async goToMovie(movieID: number) {
    const loading = await this.loader.create({
    });
    loading.present().then(_ => {
      this.router.navigate(['details', movieID]);
    });
  }
  removeItem(slidingItem: IonItemSliding, movieId) {
    slidingItem.closeOpened();
    this.firebase.removeToSee(movieId).then(_ => {
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
