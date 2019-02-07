import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController, ModalController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { RecommendComponent } from '../recommend/recommend.component';
import { LoaderFixService } from '../../shared/loader-fix.service';

@Component({
  selector: 'app-seen',
  templateUrl: './seen.page.html',
  styleUrls: ['./seen.page.scss'],
})
export class SeenPage implements OnInit, OnDestroy {
  filterText = '';

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private modalController: ModalController,
    private loader: LoadingController,
    private loadingService: LoaderFixService
  ) {


  }

  movies$;

  ngOnInit() {
    this.movies$ = this.firebase.getHasSeen();
  }

  ngOnDestroy(): void {
  }


  async goToMovie(movieID: number) {
    this.loadingService.isLoading();
    const loading = await this.loader.create({
    });
    loading.present().then(_ => {
      this.router.navigate(['details', movieID]);
    });
  }
  removeItem(slidingItem: IonItemSliding, movieId) {
    slidingItem.closeOpened();
    this.firebase.removeHasSeen(movieId).then(_ => {
      slidingItem.closeOpened();
    });
  }

  async recommend(slidingItem: IonItemSliding, movieID: number, title: string) {
    const modal = await this.modalController.create({
      component: RecommendComponent,
      componentProps: { movieId: movieID, title: title }
    });
    slidingItem.close();
    await modal.present();
  }
}
