import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../../API/movie-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {LoaderFixService} from '../../shared/loader-fix.service';
import {Observable} from "rxjs";
import {APISearchResult} from "../../shared/apisearch-result";

@Component({
  selector: 'app-related',
  templateUrl: './related.page.html',
  styleUrls: ['./related.page.scss'],
})
export class RelatedPage implements OnInit {

  constructor(
    private movieApi: MovieAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoadingController,
    private loadingService: LoaderFixService
  ) { }

  private id: number;
  private related$: Observable<APISearchResult>;

  ngOnInit(): void {
    this.id = Number(this.route.parent.snapshot.paramMap.get('id'));
    this.related$ = this.movieApi.getRelated(this.id);
  }

  async goToMovie(movieId): Promise<any> {
    if (!this.loadingService.checkDestroy()) {
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
