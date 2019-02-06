import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {LoaderFixService} from "../shared/loader-fix.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {

  constructor(
      private movieApi: MovieAPIService,
      private router: Router,
      private loader: LoadingController,
      private loadingService: LoaderFixService
  ) { }

  private page: number;
  private movie$: Observable<object>;
  ngOnInit(): void {
    this.page = 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }

  next(): void {
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }

  back(): void {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }
  async goToMovie(movieId): Promise<any> {
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
