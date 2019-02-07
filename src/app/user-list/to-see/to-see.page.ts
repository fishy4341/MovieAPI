import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController, ModalController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { RecommendComponent } from '../recommend/recommend.component';
import { LoaderFixService } from '../../shared/loader-fix.service';

@Component({
  selector: 'app-to-see',
  templateUrl: './to-see.page.html',
  styleUrls: ['./to-see.page.scss'],
})
export class ToSeePage implements OnInit, OnDestroy {
  filterText = '';
  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private modalController: ModalController,
    private loader: LoadingController,
    private loadingService: LoaderFixService
  ) {

  }

  movie$;

  ngOnInit() {
    this.movie$ = this.firebase.getToSee();
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
    this.firebase.removeToSee(movieId).then(_ => {
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
