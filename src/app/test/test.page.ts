import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../user-list/firebase.service";
import {User} from "../shared/user";

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
      let sendData: User = {
          id: 'abc123',
          name: 'Jacob',
          movieList: [
              {title: 'hello there', movieID: 9876}
          ]
      };
    this.firebase.updateUserML('abc123', sendData);
  }

}
