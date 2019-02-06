import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {LoaderFixService} from "../shared/loader-fix.service";

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.page.html',
  styleUrls: ['./now-playing.page.scss'],
})
export class NowPlayingPage implements OnInit {

  constructor(
      private movieApi: MovieAPIService,
      private router: Router,
      private loader: LoadingController,
      private loadingService: LoaderFixService
  ) { }

  page: number;
  movie$;
  ngOnInit() {
    this.page = 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }

  next() {
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }

  back() {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }
  async goToMovie(movieId) {
    if(!this.loadingService.checkDestroy()){
      this.loadingService.isLoading();
      const loading = await this.loader.create({
      });
      loading.present().then(_ => {
        this.router.navigate(['details', movieId]);
      });
    }
    else{
      this.router.navigate(['details', movieId]);
    }
  }

}
