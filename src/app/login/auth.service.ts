import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import {User} from '../shared/user';
import {FirebaseService} from '../user-list/firebase.service';
import {Movie} from '../shared/movie';
import {CommentsService} from './comments.service';
import {MovieWComment} from '../shared/movie-w-comment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth;
  private userData: User = {
    name: '',
    id: '',
    mlHasSeen: [],
    mlNotSeen: []
  };

  constructor(
      public afAuth: AngularFireAuth,
      private firebase: FirebaseService,
      private commentsS: CommentsService
  ) {

  }

  // addMovieToUser(movie: Movie){
  //     if(movie.hasSeen){
  //         for(let i=0; i < this.userData.mlNotSeen.length; i++) {
  //             if (this.userData.mlNotSeen[i].movieID === movie.movieID){
  //                 this.userData.mlNotSeen.splice(i, 1);
  //             }
  //         }
  //         this.userData.mlHasSeen.push(movie);
  //         this.firebase.updateUserML(this.userData.id, this.userData);
  //     }
  //     else{
  //         for(let i=0; i < this.userData.mlHasSeen.length; i++) {
  //             if (this.userData.mlHasSeen[i].movieID === movie.movieID){
  //                 this.userData.mlHasSeen.splice(i, 1);
  //             }
  //         }
  //         this.userData.mlNotSeen.push(movie);
  //         this.firebase.updateUserML(this.userData.id, this.userData);
  //     }
  //
  // }

    // removeMovieFromUser(movieId, list){
    //   console.log(this.userData.mlHasSeen);
    //     if(list == "seen"){
    //         if(this.userData.mlHasSeen.length == 1) {
    //             if (this.userData.mlHasSeen[0].movieID === movieId) {
    //                 this.userData.mlHasSeen = [];
    //             }
    //         }
    //         else {
    //             for(let i=0; i < this.userData.mlHasSeen.length; i++) {
    //                 if (this.userData.mlHasSeen[i].movieID === movieId){
    //                     this.userData.mlHasSeen.splice(i, 1);
    //                 }
    //             }
    //         }
    //
    //         this.firebase.updateUserML(this.userData.id, this.userData);
    //     }
    //     else{
    //         if(this.userData.mlNotSeen.length == 1) {
    //             if (this.userData.mlNotSeen[0].movieID === movieId) {
    //                 this.userData.mlNotSeen = [];
    //             }
    //         } else {
    //             for(let i=0; i < this.userData.mlNotSeen.length; i++) {
    //                 if (this.userData.mlNotSeen[i].movieID === movieId){
    //                     this.userData.mlNotSeen.splice(i, 1);
    //                 }
    //             }
    //         }
    //
    //         this.firebase.updateUserML(this.userData.id, this.userData);
    //     }
    //
    //
    //
    // }



  // getUserInfo(): User {
  //     return this.userData;
  // }
  // // refreshUserInfo(){
  // //     this.userData.id =  this.afAuth.auth.currentUser.uid;
  // //     this.userData.name = this.afAuth.auth.currentUser.displayName;
  // //     return this.firebase.retrieveUser(this.userData.id);
  // //
  // // }
  // updateUserMovieList(hasSeen: Movie[], notSeen: Movie[]){
  //     this.userData.mlHasSeen = hasSeen;
  //     this.userData.mlNotSeen = notSeen;
  // }


  googleSignIn() {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    //     .then(authUserData => {
    //       this.userData.id = authUserData.user.uid;
    //       this.userData.name = authUserData.user.displayName;
    //       // console.log(this.userData);
    //       this.firebase.checkUser(this.userData.id)
    //           .subscribe(theBool => {
    //             // console.log('the bool is: ');
    //             // console.log(theBool);
    //             if(theBool){
    //               this.firebase.retrieveUser(this.userData.id)
    //                   .subscribe(dbUserData =>{
    //                     // console.log('dbUserData is: ');
    //                     // console.log(dbUserData);
    //                     // @ts-ignore
    //                       this.userData.mlHasSeen = dbUserData.molHasSeen;
    //                       // @ts-ignore
    //                       this.userData.mlNotSeen = dbUserData.mlNotSeen;
    //                     console.log('userData is now: ');
    //                     console.log(this.userData);
    //                   })
    //             }
    //             else{
    //               this.firebase.addUser(this.userData);
    //             }
    //           })
    //     });
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
          .then(authUserData => {
              this.userData.id = authUserData.user.uid;
              this.userData.name = authUserData.user.displayName;
              this.firebase.getUserData().subscribe(docSnapshot => {
                  if (!docSnapshot) {
                      this.firebase.addUser({
                          name: this.userData.name,
                          id: this.userData.id
                      });
                  }
              });
          });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(
      map(user => user && user.uid ? true : false));
  }

  // updateComment(movie: Movie){
  //     let theComment: Comment = {
  //         comment: movie.comment,
  //         userID: this.userData.id;
  //     };
  //     let movieWComment: MovieWComment = {
  //         title: movie.title,
  //         movieID: movie.movieID,
  //         comments: [{comment: movie.comment, userID: this.userData.id}]
  //     };
  //     let found: boolean = false;
  //     if(movie.hasSeen){
  //         for(let i: number = 0; i < this.userData.mlHasSeen.length; i++){
  //             if(this.userData.mlHasSeen[i].movieID === movie.movieID){
  //                 found = true;
  //                 this.commentsS.updateMovieComments(movieWComment);
  //             }
  //         }
  //     }
  // }



}
