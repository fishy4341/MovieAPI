import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../API/movie-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.page.html',
  styleUrls: ['./now-playing.page.scss'],
})
export class NowPlayingPage implements OnInit {

  constructor(
      private movieApi: MovieAPIService,
      private router: Router,
  ) { }

  page: number;
  movie$;
  ngOnInit() {
    this.page = 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }

  next(){
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }

  back() {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }
  goToMovie(movieId){
    this.router.navigate(['details', movieId]);
  }

}
