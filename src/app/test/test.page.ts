import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../user-list/firebase.service";
import {User} from "../shared/user";
import {AuthService} from "../login/auth.service";
import {timeInterval} from "rxjs/operators";

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private firebase: FirebaseService,
              private authServ: AuthService) { }

  ngOnInit() {
  }

  async methOne(){
      this.authServ.refreshUserInfo();
  }

}
