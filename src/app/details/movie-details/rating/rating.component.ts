import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

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
    this.navParams.data.value.subscribe(data => {
      this.movie = data;
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'rating': this.rating,
      'movie': this.movie.title,
      'movieId': this.movie.id,
      'hasSeen': true

    });
  }

}
