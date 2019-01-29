import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../user-list/firebase.service';
import {User} from '../shared/user';
import {AuthService} from '../login/auth.service';
import {timeInterval} from 'rxjs/operators';
import {Movie, Movie2} from '../shared/movie';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

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

  movies$: Observable<Movie2>;

  constructor(private firebase: FirebaseService,
              private authServ: AuthService,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // this.movies$ = this.firebase.getHasSeen();
  }

  methOne() {
    this.firebase.pushHasSeen({
      title: 'movie',
      movieID: 123,
      pic: 'linktoimage',
      genres: []
    });
      // this.db.collection('users').doc(this.afAuth.auth.currentUser.uid);
    console.log(this.afAuth.auth.currentUser);
    this.getHasSeen().subscribe(data => {
      console.log(data);
    });
  }

  getHasSeen() {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).valueChanges();
  }

}
