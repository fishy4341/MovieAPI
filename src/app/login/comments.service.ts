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


  addMovie(movie: Movie2, comment: Comment): void {
    this.getMovieData(movie.movieID).subscribe(movieData =>{
        if(!movieData){
            this.db.collection(`allComments`).doc(`${movie.movieID}`).set(movie).then(ignoreVar => {
                this.db.collection(`allComments/${movie.movieID}/comments`).doc(`${comment.userID}`).set(comment);
            });
        }
        else{
            return this.db.collection(`allComments/${movie.movieID}/comments`).doc(comment.userID).valueChanges().subscribe(commentData =>{
                if(commentData){
                    this.db.collection(`allComments/${movie.movieID}/comments`).doc(comment.userID).update({'comment': comment.comment});
                }
                else{
                    this.db.collection(`allComments/${movie.movieID}/comments`).doc(`${comment.userID}`).set(comment);
                }
            })
        }
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
  getMovieData(movieID: number){
      return this.db.collection(`allComments`).doc(`${movieID}`).valueChanges();
  }

  updateAComment(movieID: number, comment: Comment): void {
    this.db.collection(`allComments/${movieID}/comments`).doc(comment.userID).update({'comment': comment.comment});
  }
  deleteCommment(movieID: number, userID: string): void {
      this.db.collection(`allComments/${movieID}`).doc(userID).delete();
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
