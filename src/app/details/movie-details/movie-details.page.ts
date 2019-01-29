import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {MovieAPIService} from '../../API/movie-api.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {SelectedMovieService} from '../../API/selected-movie.service';
import {ModalController} from '@ionic/angular';
import {RatingComponent} from './rating/rating.component';
import {AuthService} from '../../login/auth.service';
import {Movie} from '../../shared/movie';
=======
import {MovieAPIService} from "../../API/movie-api.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SelectedMovieService} from "../../API/selected-movie.service";
import {ModalController} from "@ionic/angular";
import {RatingComponent} from "./rating/rating.component";
import {AuthService} from "../../login/auth.service";
import {Movie, Movie2} from "../../shared/movie";
import {FirebaseService} from "../../user-list/firebase.service";
>>>>>>> 3ec713d577948c84a4f69139c12b3e0808086fac

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  get movieId(): number {
    return this.selectedMovie.movieId;
  }

<<<<<<< HEAD
  constructor(
    private movieApi: MovieAPIService,
    public sanitizer: DomSanitizer,
    private selectedMovie: SelectedMovieService,
    public modalController: ModalController,
    private auth: AuthService
    ) { }
=======
  constructor(private movieApi: MovieAPIService, public sanitizer: DomSanitizer, private selectedMovie: SelectedMovieService, public modalController: ModalController, private auth: AuthService, private firebase: FirebaseService) { }
>>>>>>> 3ec713d577948c84a4f69139c12b3e0808086fac

  authenticated;
  id = this.movieId;
  movie;
  private url: string;
  video: SafeResourceUrl;
  watched: boolean;
  watchList: boolean;
  user;

  ngOnInit() {
    this.movieApi.getMovieDetail(this.id).subscribe(data => {
      this.movie = data;
    });
    // this.movieApi.getMovieVideo(this.id).subscribe(data => {
    //   this.url = `https://www.youtube.com/embed/?controls=0&showinfo=0&rel=0`;
    //   this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    // });
    // this.auth.isAuthenticated().subscribe( x => this.authenticated = x);
    // this.auth.refreshUserInfo().subscribe(data => {
    //   // @ts-ignore
    //   this.auth.updateUserMovieList(data.mlHasSeen, data.mlNotSeen);
    //   this.user = this.auth.getUserInfo();
    //   this.checkWatched();
    // });

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RatingComponent,
      componentProps: { value: this.movie}
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
<<<<<<< HEAD
    const movieData: Movie = {
      title: data.movie,
=======
    let movieData: Movie2 = {
      title: data.title,
>>>>>>> 3ec713d577948c84a4f69139c12b3e0808086fac
      movieID: data.movieId,
      rating: data.rating,
      pic: data.pic,
      genres: data.genres,
    };
    this.firebase.pushHasSeen(movieData);
  }

  addToSee() {
<<<<<<< HEAD
    let movie = {};
    this.movie$.subscribe(data => {
      movie = data;
      console.log(movie);
      const movieData: Movie = {
        // @ts-ignore
        title: movie.title,
        // @ts-ignore
        movieID: movie.id,
        rating: 0,
        comment: '',
        hasSeen: false,
      };
      this.auth.addMovieToUser(movieData);
      this.checkWatched();
    });
=======
    let movieData: Movie2 = {
      title: this.movie.title,
      movieID: this.movie.id,
      pic: this.movie.poster_path,
      genres: this.movie.genres,
    };
    this.firebase.pushToSee(movieData);
>>>>>>> 3ec713d577948c84a4f69139c12b3e0808086fac

  }

  checkWatched() {
    for (let i = 0; i < this.user.mlHasSeen.length; i++) {
      if (this.id === this.user.mlHasSeen[i].movieID) {
        this.watched = true;
      }
    }
    for (let i = 0; i < this.auth.getUserInfo().mlNotSeen.length; i++) {
      if (this.id === this.user.mlNotSeen[i].movieID) {
        this.watchList = true;
      }
    }
  }

}
