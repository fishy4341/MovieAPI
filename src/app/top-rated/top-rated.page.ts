import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../API/movie-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.page.html',
  styleUrls: ['./top-rated.page.scss'],
})
export class TopRatedPage implements OnInit {

  constructor(
      private movieApi: MovieAPIService,
      private router: Router,
  ) { }

  page: number;
  movie$;
  ngOnInit() {
    this.page = 1;
    this.movie$ = this.movieApi.getTopRated(this.page);
  }

  next(){
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getTopRated(this.page);
  }

  back() {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getTopRated(this.page);
  }
  goToMovie(movieId){
    this.router.navigate(['details', movieId]);
  }

}
