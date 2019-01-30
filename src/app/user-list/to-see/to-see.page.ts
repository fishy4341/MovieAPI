import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../login/auth.service';
import {Movie} from '../../shared/movie';
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
  private notSeenBefore: Movie[] = [];
  private displayMovies = [];
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
    // if(this.auth.getUserInfo().name === ''){
    //   this.auth.refreshUserInfo().subscribe(dbUserData =>{
    //     // @ts-ignore
    //     this.auth.updateUserMovieList(dbUserData.mlHasSeen, dbUserData.mlNotSeen);
    //     console.log('checking for movies you have not seen');
    //     console.log(this.auth.getUserInfo());
    //     this.notSeenBefore = this.auth.getUserInfo().mlNotSeen;
    //     this.fillOutMovies();
    //   });
    // }
    // else{
    //   this.notSeenBefore = this.auth.getUserInfo().mlNotSeen;
    //   this.fillOutMovies();
    // }
  }

  // fillOutMovies(){
  //   this.displayMovies = [];
  //   for(let i: number = 0; i < this.notSeenBefore.length; i++){
  //     this.getMovieDetail(this.notSeenBefore[i].movieID, this.notSeenBefore[i].title);
  //   }
  // }
  // getMovieDetail(movieID: number,movieTitle: string){
  //   this.movieService.getMovieDetail(movieID).subscribe(movieData =>{
  //     let result = {
  //       // @ts-ignore
  //       pic: movieData.poster_path,
  //       // @ts-ignore
  //       genres: movieData.genres,
  //       title: movieTitle,
  //       movieID: movieID
  //     };
  //     this.displayMovies.push(result);
  //   })
  // }

  goToMovie(movieID: number) {
    this.selectedMovie.movieId = movieID;
    this.navController.navigateForward('details');
  }

  removeItem(slidingItem: IonItemSliding, movieId) {
    slidingItem.closeOpened();
    this.firebase.removeToSee(movieId).then(_ => {
      slidingItem.closeOpened();
    });

    // slidingItem.close();
    // this.fillOutMovies();
  }

}
