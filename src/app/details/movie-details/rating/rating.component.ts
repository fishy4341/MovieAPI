import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  // @input() value;
  movie$;
  rating;

  constructor(public navParams: NavParams, public modalController: ModalController) { }

  ngOnInit() {
    this.movie$ = this.navParams.data.value;
  }

  dismiss() {
    this.modalController.dismiss({
      'result': this.rating
    });
  }

}
