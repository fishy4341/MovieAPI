import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../API/movie-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {LoaderFixService} from "../shared/loader-fix.service";
import {Observable} from "rxjs";

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
    private loader: LoadingController,
    private loadingService: LoaderFixService
  ) { }
  private page: number;
  private movie$: Observable<object>;
  ngOnInit():void {
    this.page = 1;
    this.movie$ = this.movieApi.getUpcoming(this.page);
  }

  next():void {
    this.page = this.page + 1;
    this.movie$ = this.movieApi.getUpcoming(this.page);
  }

  back():void {
    this.page = this.page - 1;
    this.movie$ = this.movieApi.getUpcoming(this.page);
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
