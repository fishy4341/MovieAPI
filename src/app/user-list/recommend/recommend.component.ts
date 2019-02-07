import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { MovieAPIService } from '../../API/movie-api.service';
import { Router } from '@angular/router';
import { LoaderFixService } from '../../shared/loader-fix.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private movieAPI: MovieAPIService,
    private router: Router,
    private loader: LoadingController,
    private loadingService: LoaderFixService
  ) { }

  id: number;
  title: string;
  recommendations$;

  ngOnInit() {
    this.id = this.navParams.data.movieId;
    this.title = this.navParams.data.title;
    this.recommendations$ = this.movieAPI.getRecommended(this.id);
  }

  close() {
    this.modalController.dismiss();
  }
  async goToMovie(movieId) {
    if (!this.loadingService.checkDestroy()) {
      this.loadingService.isLoading();
      const loading = await this.loader.create({
      });
      loading.present().then(_ => {
        this.router.navigate(['details', movieId]);
        this.modalController.dismiss();
      });
    } else {
      this.router.navigate(['details', movieId]);
    }
  }

}
