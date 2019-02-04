import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../API/movie-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {

  constructor(
      private movieApi: MovieAPIService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }
  page: number;
  movie$;
  ngOnInit() {
    this.page = 1;
    this.movie$ = this.movieApi.getUpcoming(this.page);
  }

  next(){
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getUpcoming(this.page);
  }

  back() {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getUpcoming(this.page);
  }
  goToMovie(movieId){
    this.router.navigate(['details', movieId]);
  }

}
