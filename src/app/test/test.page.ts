import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../user-list/firebase.service";
import {User} from "../shared/user";
import {AuthService} from "../login/auth.service";
import {timeInterval} from "rxjs/operators";
import {Movie} from "../shared/movie";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  private testMovie: Movie = {
    title: 'Your Name',
    movieID: 372058,
    comment: 'My Favorite movie ever! Truly!',
    rating: 10,
    hasSeen: true
  };

  constructor(private firebase: FirebaseService,
              private authServ: AuthService,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  methOne(){
      // this.db.collection('users').doc(this.afAuth.auth.currentUser.uid);
  }

}
