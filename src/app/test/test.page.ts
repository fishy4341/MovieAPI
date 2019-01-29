import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../user-list/firebase.service";
import {User} from "../shared/user";
import {AuthService} from "../login/auth.service";
import {timeInterval} from "rxjs/operators";
import {Movie, Movie2} from "../shared/movie";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";
import {CommentsService} from "../login/comments.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  private testMovie: Movie2 = {
    title: 'Your Name',
    movieID: 372058,
    rating: 10,
    genres: [
      {id: 10749, name: 'Romance'},
      {id: 16, name: 'Animation'},
      {id: 18, name: 'Drama'}
    ],
    pic: 'https://image.tmdb.org/t/p/w500//6vkhRvsRvWpmaRVyCXaxTkIEb7j.jpg'
  };
  private commentsForTest;

  movies$: Observable<Movie2>;

  constructor(private firebase: FirebaseService,
              private authServ: AuthService,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private commentService: CommentsService) { }

  ngOnInit() {
    // this.movies$ = this.firebase.getHasSeen();
    this.commentsForTest = this.commentService.getCommentsFor(this.testMovie.movieID);
  }

  methOne() {
    this.commentService.addMovie(this.testMovie, {userID: 'userIDFromTest', comment: 'my most favorite movie of all testing'});
  }

  getHasSeen() {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).valueChanges();
  }

}
