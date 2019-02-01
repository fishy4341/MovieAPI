import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../user-list/firebase.service';
import {AuthService} from '../login/auth.service';
import {Movie} from '../shared/movie';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {CommentsService} from '../login/comments.service';
import {Comment} from '../shared/comment';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  private testMovie: Movie = {
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
  private testComment: Comment = {
    comment: 'Testing 123, Favorite Movie, Beep the Bleep'
  };
  private commentsForTest;

  movies$: Observable<Movie>;

  constructor(private firebase: FirebaseService,
              private authServ: AuthService,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private commentService: CommentsService) { }

  ngOnInit() {
    this.commentsForTest = this.commentService.getCommentsFor(this.testMovie.movieID);
  }

  methOne() {
    this.commentService.addMovie(this.testMovie, this.testComment, 'LJuxxceTALf4WNGZFP9WjPbZfF42');
  }

  getHasSeen() {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).valueChanges();
  }

}
