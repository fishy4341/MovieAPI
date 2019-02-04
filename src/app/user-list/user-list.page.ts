import { Component, OnInit } from '@angular/core';
import {AuthService} from '../login/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  private userName: string = this.afAuth.auth.currentUser.displayName;
  private displayUserName: string = this.checkNameLength();

  constructor(
      private auth: AuthService,
      private afAuth: AngularFireAuth
  ) {
  }

  ngOnInit() {
  }

  checkNameLength(): string {
    if (this.userName.length > 6) {
      return this.userName.slice(0, 5) + '...';
    } else {
      return this.userName + '\'s';
    }
  }

}
