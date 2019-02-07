import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {LoaderFixService} from "../shared/loader-fix.service";
import {Observable} from "rxjs";

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

  private page: number;
  private movie$: Observable<Object>;
  ngOnInit(): void {
    this.page = 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }

  next(): void {
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }

  back(): void {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getNowPlaying(this.page);
  }
  async goToMovie(movieId): Promise<any> {
    if(!this.loadingService.checkDestroy()){
      this.loadingService.isLoading();
      const loading = await this.loader.create({
      });
      loading.present().then(_ => {
        this.router.navigate(['details', movieId]);
      });
    } else {
      this.router.navigate(['details', movieId]);
    }
  }

}
