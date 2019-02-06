import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  rating;

  constructor(
      public navParams: NavParams,
      public modalController: ModalController
  ) { }

  get movie() {return this.navParams.data.value; }
  get start() {return this.navParams.data.rating; }

  ngOnInit() {
  }

  dismiss() {
    if (!this.rating) {
      this.rating = 0;
    }
    this.modalController.dismiss({
      'rating': this.rating,
      'title': this.movie.title,
      'movieId': this.movie.id,
      'pic': this.movie.poster_path,
      'genres': this.movie.genres
    });
  }
  exit() {
    this.modalController.dismiss();
  }

}
