import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument, DocumentSnapshot} from '@angular/fire/firestore';
import {MovieWComment} from '../shared/movie-w-comment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {stringify} from 'querystring';
import {Movie2} from '../shared/movie';
import {Comment} from '../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
      private db: AngularFirestore
  ) { }


  addMovie(movie, comment: Comment): void{
    let dbMovieData:Movie2 = {
        title: movie.title,
        genres: movie.genres,
        movieID: movie.id,
        pic: movie.poster_path
    };

    this.db.collection(`allComments`).doc(`${dbMovieData.movieID}`).set(dbMovieData).then(ignoreVar =>{
        this.db.collection(`allComments/${dbMovieData.movieID}/comments`).doc(`${comment.userID}`).set(comment);
    });
  }

  updateMovie(movie: Movie2) {
      this.db.collection(`allComments`).doc(`${movie.movieID}`).update(movie);
  }


  // commentQuery(movieID: number){
  //   return this.db.collection<AngularFirestoreDocument>('comments', ref => ref.where('movieID', '==', `${movieID}`));
  // }

  getCommentsFor(movieID: number) {
      return this.db.collection(`allComments/${movieID}/comments`).valueChanges();
  }

  getUserComment(movieID: number, userID: string) {
      return this.db.collection(`allComments/${movieID}/comments`).doc(userID).valueChanges();
  }

  updateAComment(movieID: number, comment: Comment): void {
    this.db.collection(`allComments/${movieID}/comments`).doc(comment.userID).update({'comment': comment.comment});
  }
  deleteCommment(movieID: number, userID: string): void {
      this.db.collection(`allComments/${movieID}/comments`).doc(userID).delete();
  }

  // getDocRef(movieID: number){
  //   let docRef = this.db.collection<AngularFirestoreDocument>('comments', ref => ref.where('movieID', '==', `${movieID}`));
  //   // console.log(docRef);
  //   return docRef.snapshotChanges()
  //       .pipe(
  //           map(action =>{
  //             // console.log('action is: ');
  //             // console.log(action[0].payload);
  //             return action[0].payload.doc.ref;
  //           })
  //       )
  // }

  // checkForMovie(movie: MovieWComment){
  //   this.commentQuery(movie.movieID).snapshotChanges()
  //       .subscribe(data =>{
  //         if (data.length === 0){
  //           this.addMovie(movie);
  //         }
  //         else{
  //           this.updateMovieComments(movie);
  //         }
  //       });
  // }


}
