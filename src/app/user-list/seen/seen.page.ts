import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../login/auth.service';
import {IonItemSliding, LoadingController, ModalController, NavController} from '@ionic/angular';
import {MovieAPIService} from '../../API/movie-api.service';
import {FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';
import {RecommendComponent} from '../recommend/recommend.component';
import {LoaderFixService} from "../../shared/loader-fix.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-seen',
  templateUrl: './seen.page.html',
  styleUrls: ['./seen.page.scss'],
})
export class SeenPage implements OnInit, OnDestroy {
  private genres: object = {};
  private filterText: string = '';
  constructor(
      private auth: AuthService,
      private navController: NavController,
      private movieService: MovieAPIService,
      private firebase: FirebaseService,
      private router: Router,
      private modalController: ModalController,
      private loader: LoadingController,
      private loadingService: LoaderFixService
  ) {


  }

  private movies$: Observable<object>;
  ngOnInit():void {
    this.movies$ = this.firebase.getHasSeen();
  }

  ngOnDestroy(): void {
    // this.firebase.getHasSeen().unsubscribe();
  }


  async goToMovie(movieID: number):Promise<any> {
    this.loadingService.isLoading();
    const loading = await this.loader.create({
    });
    loading.present().then(_ => {
      this.router.navigate(['details', movieID]);
    });
  }
  removeItem(slidingItem: IonItemSliding, movieId):void {
    slidingItem.closeOpened();
    this.firebase.removeHasSeen(movieId).then(_ => {
      slidingItem.closeOpened();
    });
  }

  async recommend(slidingItem: IonItemSliding, movieID: number, title: string):Promise<any> {
    const modal = await this.modalController.create({
      component: RecommendComponent,
      componentProps: {movieId: movieID, title: title}
    });
    slidingItem.close();
    await modal.present();
  }
}
