import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../../API/movie-api.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {SelectedMovieService} from '../../API/selected-movie.service';
import {ModalController} from '@ionic/angular';
import {RatingComponent} from './rating/rating.component';
import {AuthService} from '../../login/auth.service';
import {Movie} from '../../shared/movie';
import {FirebaseService} from '../../user-list/firebase.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {CommentsService} from 'src/app/login/comments.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  get movieId(): number {
    return this.selectedMovie.movieId;
  }

  constructor(private movieApi: MovieAPIService,
              public sanitizer: DomSanitizer,
              private selectedMovie: SelectedMovieService,
              public modalController: ModalController,
              private auth: AuthService,
              private firebase: FirebaseService,
              private commentsService: CommentsService,
              private afAuth: AngularFireAuth
  ) { }

  authenticated;
  id = this.movieId;
  movie;
  private url: string;
  video: SafeResourceUrl;
  watched: boolean;
  watchList: boolean;
  user;
  private currentUserRating: number;
  private movieComments;

  ngOnInit() {
    this.movieApi.getMovieDetail(this.id).subscribe(data => {
      this.movie = data;
      if(this.authenticated){
        this.checkWatched();
      }
    });
    if (this.afAuth.auth.currentUser !== null) {
        this.authenticated = !!this.afAuth.auth.currentUser.uid;
        this.movieComments = this.commentsService.getCommentsFor(this.id);
        this.firebase.getUserMovieRating(this.id).subscribe(userMovieData =>{
          this.currentUserRating = userMovieData.rating;
        });
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RatingComponent,
      componentProps: { value: this.movie}
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      const movieData: Movie = {
        title: data.title,
        movieID: data.movieId,
        rating: data.rating,
        pic: data.pic,
        genres: data.genres,
      };
      if (this.watchList) {
          this.firebase.removeToSee(movieData.movieID);
      }
      this.firebase.pushHasSeen(movieData);
      this.checkWatched();
    }
  }

  addToSee() {
    const movieData: Movie = {
      title: this.movie.title,
      movieID: this.movie.id,
      pic: this.movie.poster_path,
      genres: this.movie.genres,
    };
    this.firebase.pushToSee(movieData);
    this.checkWatched();
  }

  checkWatched() {
      if(this.afAuth.auth.currentUser !== null){
          this.firebase.getHasSeenMovie(this.movie.id).subscribe(docSnapshot => {
              if (docSnapshot.exists) {
                  this.watched = true;
              }
          });
          this.firebase.getToSeeMovie(this.movie.id).subscribe(docSnapshot => {
              if (docSnapshot.exists) {
                  this.watchList = true;
              }
          });
      }
    }
}
