import {APIMovie} from '../../shared/apimovie';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommentsService } from '../../login/comments.service';
import { MovieAPIService } from '../../API/movie-api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Comment } from '../../shared/comment';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../user-list/firebase.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IonInput } from '@ionic/angular';
import { Movie } from '../../shared/movie';
import { User } from 'firebase';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit, OnDestroy {

  constructor(
    private commentsService: CommentsService,
    private movieApi: MovieAPIService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private firebase: FirebaseService
  ) { }

  private movieComments: any;
  // private id: number;
  private movie: APIMovie;
  private authenticated: boolean;
  private userComment: string;
  private userID = 'none';
  private commentsWRating: Comment[] = [];
  private unsubscribe$: Subject<any> = new Subject();
  private rating: number;

  get id() { return Number(this.route.parent.snapshot.paramMap.get('id')); }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user: User) => {
      if (user) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      if (this.afAuth.auth.currentUser) {
        this.userID = this.afAuth.auth.currentUser.uid;
      }
      this.getUserComment();
    });
    this.movieComments = this.commentsService.getCommentsFor(this.id);
    this.movieApi.getMovieDetail(this.id).subscribe((data: APIMovie) => {
      this.movie = data;
    });
    // this.commentsService.getCommentsFor(this.id).subscribe((commentData: Comment[]) => {
    //   if (this.afAuth.auth.currentUser) {
    //     this.userID = this.afAuth.auth.currentUser.uid;
    //   }
    //   if (commentData.length === 0) {
    //     this.movieComments = [{ comment: 'Sorry, We Found No Comments For This Movie', userID: 'EmptyUserID' }];
    //   }
    //   for (let i = 0; i < commentData.length; i++) {
    //     // @ts-ignore
    //     if (commentData[i].rating) {
    //       this.commentsWRating.push(commentData[i]);
    //     }
    //   }
    // }); // end of sub callback
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUserComment(): void {
    if (this.authenticated) {
      this.commentsService.getUserComment(this.id, this.afAuth.auth.currentUser.uid).subscribe((docSnapshot: Comment) => {
        if (docSnapshot) {
          // @ts-ignore
          this.userComment = docSnapshot.comment;
        }
      }); // end of subscribe callback
    }
  }

  postComment(comment: IonInput): void {
    this.commentsWRating = [];
    const commentData: Comment = {
      comment: comment.value,
      userID: this.afAuth.auth.currentUser.uid
    };
    this.firebase.getUserMovieRating(this.movie.id).pipe(
      takeUntil(this.unsubscribe$),
      tap((movieDoc: Movie) => {
        if (movieDoc) {
          commentData.rating = movieDoc.rating;
        }
        this.commentsService.addMovie(this.movie, commentData, this.afAuth.auth.currentUser.uid);
      })// end of subscribe callback
    ).subscribe();
  }
  deleteComment(): void {
    this.commentsWRating = [];
    this.commentsService.deleteCommment(this.movie.id, this.afAuth.auth.currentUser.uid);
    this.userComment = '';
  }

}
