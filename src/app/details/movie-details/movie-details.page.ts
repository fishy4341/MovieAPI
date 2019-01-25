import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../../API/movie-api.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SelectedMovieService} from "../../API/selected-movie.service";
import {ModalController} from "@ionic/angular";
import {RatingComponent} from "./rating/rating.component";
import {AuthService} from "../../login/auth.service";
import {Movie} from "../../shared/movie";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  get movieId(): number {
    return this.selectedMovie.movieId;
  }

  constructor(private movieApi: MovieAPIService, public sanitizer: DomSanitizer, private selectedMovie: SelectedMovieService, public modalController: ModalController, private auth: AuthService) { }

  authenticated;
  id = this.movieId;
  movie$;
  private url: string;
  video: SafeResourceUrl;
  watched:boolean;
  watchList: boolean;
  user;

  ngOnInit() {
    this.movie$ = this.movieApi.getMovieDetail(this.id);
    this.movieApi.getMovieVideo(this.id).subscribe(data => {
      this.url = `https://www.youtube.com/embed/?controls=0&showinfo=0&rel=0`;
      this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    });
    this.auth.isAuthenticated().subscribe( x => this.authenticated = x);
    this.auth.refreshUserInfo().subscribe(data => {
      // @ts-ignore
      this.auth.updateUserMovieList(data.mlHasSeen, data.mlNotSeen);
      this.user = this.auth.getUserInfo();
      this.checkWatched();
    });

  }

  async presentModal(){
    const modal = await this.modalController.create({
      component: RatingComponent,
      componentProps: { value: this.movie$}
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    let movieData: Movie = {
      title: data.movie,
      movieID: data.movieId,
      rating: data.rating,
      comments: [],
      hasSeen: data.hasSeen
    };
    this.auth.addMovieToUser(movieData);
  }

  addToSee() {
    let movie = {};
    this.movie$.subscribe(data => {
      movie = data;
      console.log(movie);
      let movieData: Movie = {
        // @ts-ignore
        title: movie.title,
        // @ts-ignore
        movieID: movie.id,
        rating: 0,
        comments: [],
        hasSeen: false,
      };
      this.auth.addMovieToUser(movieData);
      this.checkWatched();
    });

  }

  checkWatched() {
    for(let i=0; i < this.user.mlHasSeen.length; i++){
      if(this.id == this.user.mlHasSeen[i].movieID){
        this.watched = true;
      }
    }
    for(let i=0; i < this.auth.getUserInfo().mlNotSeen.length; i++){
      if(this.id == this.user.mlNotSeen[i].movieID){
        this.watchList = true;
      }
    }
  }

}
