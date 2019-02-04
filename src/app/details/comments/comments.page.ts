import { Component, OnInit } from '@angular/core';
import {CommentsService} from '../../login/comments.service';
import {MovieAPIService} from '../../API/movie-api.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Comment} from '../../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../user-list/firebase.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  constructor(
      private commentsService: CommentsService,
      private movieApi: MovieAPIService,
      private afAuth: AngularFireAuth,
      private route: ActivatedRoute,
      private firebase: FirebaseService
  ) { }

  movieComments;
  id;
  movie;
  authenticated;
  userComment;
  private userID: string = 'none';
  private noRating: boolean = false;
  private yesRating: boolean = false;
  private commentsWRating = [];
  private commentsNoRating = [];
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
    this.commentsService.getCommentsFor(this.id).subscribe(commentData =>{
      if(this.afAuth.auth.currentUser){
        this.userID = this.afAuth.auth.currentUser.uid;
      }
      this.movieComments = commentData;
      for(let i: number = 0; i < commentData.length; i++){
        // @ts-ignore
        if(commentData[i].rating){
          this.commentsWRating.push(commentData[i]);
        }
        else{
          this.commentsNoRating.push(commentData[i]);
        }
      }
    });
  }

  getUserComment() {
    if (this.authenticated) {
    this.commentsService.getUserComment(this.id, this.afAuth.auth.currentUser.uid).subscribe(docSnapshot => {
      if (docSnapshot) {
        // @ts-ignore
        this.userComment = docSnapshot.comment;
      }
    });
    }
  }

  postComment(comment) {
    const commentData: Comment = {
      comment: comment.value,
      userID: this.afAuth.auth.currentUser.uid
    };
    this.firebase.getUserMovieRating(this.movie.id).subscribe(movieDoc => {
      if (movieDoc) {
        commentData.rating = movieDoc.rating;
      }
      this.commentsService.addMovie(this.movie, commentData, this.afAuth.auth.currentUser.uid);
    });
  }
  deleteComment() {
    this.commentsService.deleteCommment(this.movie.id, this.afAuth.auth.currentUser.uid);
  }

  checkYesRating(){
    this.yesRating = !this.yesRating;
    // console.log(this.commentsWRating);
  }
  checkNoRating(){
    this.noRating = !this.noRating;
    // console.log(this.commentsNoRating);
  }

}
