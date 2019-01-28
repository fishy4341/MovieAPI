import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {MovieWComment} from "../shared/movie-w-comment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
      private db: AngularFirestore
  ) { }


  addMovie(movie: MovieWComment): void{
    this.db.collection('comments').add(movie);
  }


  commentQuery(movieID: number){
    return this.db.collection<AngularFirestoreDocument>('comments', ref => ref.where('movieID', '==', `${movieID}`));
  }

  getCommentsFor(movieID: number): Observable<AngularFirestoreDocument>{
    return this.commentQuery(movieID).valueChanges()
        .pipe(map(docData =>{
          return docData[0];
        }));
  }

  updateMovieComments(movie: MovieWComment): void{
    let docRef = this.getDocRef(movie.movieID);
    docRef.subscribe(data =>{
      data.update(movie)
          .catch(err => console.error(err));
    })
  }

  getDocRef(movieID: number){
    let docRef = this.db.collection<AngularFirestoreDocument>('comments', ref => ref.where('movieID', '==', `${movieID}`));
    // console.log(docRef);
    return docRef.snapshotChanges()
        .pipe(
            map(action =>{
              // console.log('action is: ');
              // console.log(action[0].payload);
              return action[0].payload.doc.ref;
            })
        )
  }

  checkForMovie(movie: MovieWComment){
    this.commentQuery(movie.movieID).snapshotChanges()
        .subscribe(data =>{
          if (data.length === 0){
            this.addMovie(movie);
          }
          else{
            this.updateMovieComments(movie);
          }
        });
  }


}
