import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Movie2} from '../../../shared/movie';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  // @input() value;
  movie;
  rating;

  constructor(public navParams: NavParams, public modalController: ModalController) { }

  ngOnInit() {
    this.movie = this.navParams.data.value;
  }

  dismiss() {
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
