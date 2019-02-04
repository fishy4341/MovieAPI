import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../API/movie-api.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {

  constructor(
      private movieApi: MovieAPIService,
      private router: Router,
      private loader: LoadingController
  ) { }

  page: number;
  movie$;
  ngOnInit() {
    this.page = 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }

  next(){
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }

  back() {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getPopular(this.page);
  }
  async goToMovie(movieId){
    const loading = await this.loader.create({
    });
    loading.present().then(_ => {
      this.router.navigate(['details', movieId]);
    });
  }

}