import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Comment} from '../shared/comment';
import {Observable} from "rxjs";
import {APIMovie} from "../shared/apimovie";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(
        private db: AngularFirestore
    ) { }


  addMovie(movie: APIMovie, comment: Comment, userID: string): void {
      const dbMovieData = {
          title: movie.title,
          genres: movie.genres,
          movieID: movie.id,
          pic: movie.poster_path
      };
      this.db.collection(`allComments`).doc(`${dbMovieData.movieID}`).set(dbMovieData).then(ignoreVar => {
          this.db.collection(`allComments/${dbMovieData.movieID}/comments`).doc(`${userID}`).set(comment);
      });
  }
  getCommentsFor(movieID: number): Observable<Comment[]> {
      return this.db.collection<Comment>(`allComments/${movieID}/comments`).valueChanges();
  }
  getUserComment(movieID: number, userID: string): Observable<Comment> {
      return this.db.collection<Comment>(`allComments/${movieID}/comments`).doc<Comment>(userID).valueChanges();
  }
  updateCommentRating(movieID: number, userID: string, rating: number): void {
    this.db.collection(`allComments/${movieID}/comments`).doc(userID).update({'rating': rating});
  }
  deleteCommment(movieID: number, userID: string): void {
      this.db.collection(`allComments/${movieID}/comments`).doc(userID).delete();
  }
}
