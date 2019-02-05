import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from '../../API/movie-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

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
      private loader: LoadingController
  ) { }

  id;
  related$;

  ngOnInit() {
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.related$ = this.movieApi.getRelated(this.id);
  }

  async goToMovie(movieId) {
    const loading = await this.loader.create({
    });
    loading.present().then(_ => {
      this.router.navigate(['details', movieId]);
    });
  }

}
