import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../../API/movie-api.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {SelectedMovieService} from '../../API/selected-movie.service';
import {ModalController} from '@ionic/angular';
import {RatingComponent} from './rating/rating.component';
import {AuthService} from '../../login/auth.service';
import {Movie, Movie2} from '../../shared/movie';
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
              public afAuth: AngularFireAuth
  ) { }

  authenticated;
  id = this.movieId;
  movie;
  private url: string;
  video: SafeResourceUrl;
  watched: boolean;
  watchList: boolean;
  user;
  private movieComments;

  ngOnInit() {
    this.movieApi.getMovieDetail(this.id).subscribe(data => {
      this.movie = data;
      this.checkWatched();
    });
    this.authenticated = !!this.afAuth.auth.currentUser.uid;
    this.movieComments = this.commentsService.getCommentsFor(this.id);
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
    const movieData: Movie2 = {
      title: data.title,
      movieID: data.movieId,
      rating: data.rating,
      pic: data.pic,
      genres: data.genres,
    };
    this.firebase.pushHasSeen(movieData);
    this.checkWatched();
  }

  addToSee() {
    const movieData: Movie2 = {
      title: this.movie.title,
      movieID: this.movie.id,
      pic: this.movie.poster_path,
      genres: this.movie.genres,
    };
    this.firebase.pushToSee(movieData);
    this.checkWatched();
  }

  checkWatched() {
    this.firebase.getHasSeenMovie(this.movie.id).subscribe(docSnapshot => {
      if (docSnapshot.exists) {
        this.watched = true;
        console.log(this.watched);
      }
    });
    this.firebase.getToSeeMovie(this.movie.id).subscribe(docSnapshot => {
      if (docSnapshot.exists) {
        this.watchList = true;
        console.log(this.watchList);
      }
    });
    // for(let i=0; i < this.auth.getUserInfo().mlNotSeen.length; i++){
    //   if(this.id == this.user.mlNotSeen[i].movieID){
    //     this.watchList = true;
    //   }
    // }
  }

}
