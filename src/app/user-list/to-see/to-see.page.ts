import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../login/auth.service';
import {MovieAPIService} from '../../API/movie-api.service';
import {IonItemSliding, LoadingController, ModalController, NavController} from '@ionic/angular';
import {FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';
import {RecommendComponent} from '../recommend/recommend.component';
import {LoaderFixService} from '../../shared/loader-fix.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-to-see',
  templateUrl: './to-see.page.html',
  styleUrls: ['./to-see.page.scss'],
})
export class ToSeePage implements OnInit, OnDestroy {
  private genres: object = {};
  private filterText = '';
  constructor(
      private auth: AuthService,
      private movieService: MovieAPIService,
      private navController: NavController,
      private firebase: FirebaseService,
      private router: Router,
      private modalController: ModalController,
      private loader: LoadingController,
      private loadingService: LoaderFixService
  ) {

  }

  private movie$: Observable<object>;

  ngOnInit() {
    this.movie$ = this.firebase.getToSee();
  }

  ngOnDestroy(): void {
  }


  async goToMovie(movieID: number): Promise<any> {
    this.loadingService.isLoading();
    const loading = await this.loader.create({
    });
    loading.present().then(_ => {
      this.router.navigate(['details', movieID]);
    });
  }
  removeItem(slidingItem: IonItemSliding, movieId): void {
    slidingItem.closeOpened();
    this.firebase.removeToSee(movieId).then(_ => {
      slidingItem.closeOpened();
    });
  }

  async recommend(slidingItem: IonItemSliding, movieID: number, title: string): Promise<any> {
    const modal = await this.modalController.create({
      component: RecommendComponent,
      componentProps: { movieId: movieID, title: title }
    });
    slidingItem.close();
    await modal.present();
  }
}
