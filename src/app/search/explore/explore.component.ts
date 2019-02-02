import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../../API/movie-api.service";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private movieApi: MovieAPIService,
              private loader: LoadingController,
              private router: Router,
              ) { }

  latest$;
  nowPlaying$;
  popular$;
  topRated$;
  upcoming$;

  ngOnInit() {
    this.latest$ = this.movieApi.getLatest();
    this.nowPlaying$ = this.movieApi.getNowPlaying();
    this.popular$ = this.movieApi.getPopular();
    this.topRated$ = this.movieApi.getTopRated();
    this.upcoming$ = this.movieApi.getUpcoming();

  }

  async goToMovie(movieId) { // add async for loader
    const loading = await this.loader.create({
    });
    loading.present().then(_ => {
      this.router.navigate(['details', movieId]);
    });
  }

}
