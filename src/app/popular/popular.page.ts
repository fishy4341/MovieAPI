import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {

  constructor(
      private movieApi: MovieAPIService,
      private router: Router,
  ) { }

  page: number;
  movie$;
  ngOnInit() {
    this.page = 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }

  next() {
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }

  back() {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }
  goToMovie(movieId) {
    this.router.navigate(['details', movieId]);
  }

}
