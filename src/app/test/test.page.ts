import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../user-list/firebase.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }

  methOne(){
    this.firebase.updateUserML('abc123', [{title: 'hello there', movieID: 9876}])
  }

}
