import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {FirebaseService} from "../../../user-list/firebase.service";
import {Movie} from "../../../shared/movie";

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  // @input() value;
  private movie: any;
  private rating: number;
  private start: number;

  constructor(
      public navParams: NavParams,
      public modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.movie = this.navParams.data.value;
    this.start = this.navParams.data.rating;
  }

  dismiss(): void {
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
  exit(): void {
    this.modalController.dismiss();
  }

}
