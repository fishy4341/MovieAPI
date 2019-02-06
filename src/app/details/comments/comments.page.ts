import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentsService} from '../../login/comments.service';
import {MovieAPIService} from '../../API/movie-api.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Comment} from '../../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../user-list/firebase.service';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

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

  movieComments = [];
  id;
  movie;
  authenticated;
  userComment;
  private userID = 'none';
  private noRating = false;
  private yesRating = false;
  private commentsWRating = [];
  private unsubscribe$ = new Subject();
  rating;


  ngOnInit() {
    this.id = Number(this.route.parent.snapshot.paramMap.get('id'));
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    this.getUserComment();
    } );
    this.movieApi.getMovieDetail(this.id).subscribe(data => {
      this.movie = data;
    });
    this.commentsService.getCommentsFor(this.id).subscribe(commentData => {
      if (this.afAuth.auth.currentUser) {
        this.userID = this.afAuth.auth.currentUser.uid;
      }
      if(commentData.length !== 0){
        this.movieComments = commentData;
      }
      else{
        this.movieComments = [{comment:"Sorry, We Found No Comments For This Movie"}];
      }
      for(let i: number = 0; i < commentData.length; i++){
        // @ts-ignore
        if (commentData[i].rating) {
          this.commentsWRating.push(commentData[i]);
        }
      }
    }); // end of sub callback
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUserComment() {
    if (this.authenticated) {
    this.commentsService.getUserComment(this.id, this.afAuth.auth.currentUser.uid).subscribe(docSnapshot => {
      if (docSnapshot) {
        // @ts-ignore
        this.userComment = docSnapshot.comment;
      }
    }); // end of subscribe callback
    }
  }

  postComment(comment) {
    this.commentsWRating = [];
    const commentData: Comment = {
      comment: comment.value,
      userID: this.afAuth.auth.currentUser.uid
    };
    this.firebase.getUserMovieRating(this.movie.id).pipe(
        takeUntil(this.unsubscribe$),
        tap(movieDoc => {
          if (movieDoc) {
            // @ts-ignore
            commentData.rating = movieDoc.rating;
          }
          this.commentsService.addMovie(this.movie, commentData, this.afAuth.auth.currentUser.uid);
        })// end of subscribe callback
    ).subscribe();
  }
  deleteComment() {
    this.commentsWRating = [];
    this.commentsService.deleteCommment(this.movie.id, this.afAuth.auth.currentUser.uid);
  }

  checkYesRating() {
    this.yesRating = !this.yesRating;
    // console.log(this.commentsWRating);
  }
  checkNoRating() {
    this.noRating = !this.noRating;
    // console.log(this.commentsNoRating);
  }

}
