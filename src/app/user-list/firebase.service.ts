import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import {User} from '../shared/user';
import {Movie} from '../shared/movie';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
      private db: AngularFirestore,
      private afAuth: AngularFireAuth
  ) { }


  addUser(user: User) {
   this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).set(user);
  }
  getHasSeen(): any{
      return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).valueChanges();
  }

  getToSee(): any{
      return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).valueChanges();
  }
  getUserData(): any{
    return this.db.collection(`users`).doc(this.afAuth.auth.currentUser.uid).valueChanges();
  }
  getUserMovieRating(movieID: number): any{
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc(`${movieID}`).valueChanges();
  }
  pushHasSeen(movie: Movie): any{
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc(String(movie.movieID)).set(movie);
  }
  pushToSee(movie: Movie): any{
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).doc(String(movie.movieID)).set(movie);
  }

  removeHasSeen(movieId: number): any{
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc(String(movieId)).delete();
  }

  removeToSee(movieId: number): any{
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).doc(String(movieId)).delete();
  }

  getHasSeenMovie(movieId: number): any{
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc(String(movieId)).get();
  }

  getToSeeMovie(movieId: number): any{
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).doc(String(movieId)).get();
  }
}
