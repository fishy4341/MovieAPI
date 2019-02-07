import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentSnapshot, DocumentSnapshotExists} from '@angular/fire/firestore';
import {User} from '../shared/user';
import {Movie} from '../shared/movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
      private db: AngularFirestore,
      private afAuth: AngularFireAuth
  ) { }


  addUser(user: User):void {
   this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).set(user);
  }
  getHasSeen(): Observable<Movie[]>{
      return this.db.collection<Movie>(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).valueChanges();
  }

  getToSee(): Observable<Movie[]>{
      return this.db.collection<Movie>(`users/${this.afAuth.auth.currentUser.uid}/toSee`).valueChanges();
  }
  getUserData():Observable<User>{
    return this.db.collection('users').doc<User>(this.afAuth.auth.currentUser.uid).valueChanges();
  }
  getUserMovieRating(movieID: number): Observable<Movie>{
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc<Movie>(`${movieID}`).valueChanges();
  }
  pushHasSeen(movie: Movie): void{
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc(String(movie.movieID)).set(movie);
  }
  pushToSee(movie: Movie): void{
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).doc(String(movie.movieID)).set(movie);
  }

  removeHasSeen(movieId: number): Promise<void>{
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc(String(movieId)).delete();
  }

  removeToSee(movieId: number): Promise<void>{
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).doc(String(movieId)).delete();
  }

  getHasSeenMovie(movieId: number):Observable<Movie>{
    return this.db.collection<Movie>(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc<Movie>(String(movieId)).valueChanges();
  }

  getToSeeMovie(movieId: number): Observable<Movie>{
    return this.db.collection<Movie>(`users/${this.afAuth.auth.currentUser.uid}/toSee`).doc<Movie>(String(movieId)).valueChanges();
  }

}
