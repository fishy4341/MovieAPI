import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
})
export class LoadingModalComponent implements OnInit {
  private isBusy: boolean;

  constructor() {
    this.isBusy = false;
  }

  show() {
    this.isBusy = true;
  }

  hide(){
    this.isBusy = false;
  }

  ngOnInit() {
  }

}
