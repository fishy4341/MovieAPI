import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import {User} from '../shared/user';
import {FirebaseService} from '../user-list/firebase.service';
import {Movie} from '../shared/movie';

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
      private firebase: FirebaseService
  ) {

  }

  addMovieToUser(movie: Movie) {
      if (movie.hasSeen) {
          for (let i = 0; i < this.userData.mlNotSeen.length; i++) {
              if (this.userData.mlNotSeen[i].movieID === movie.movieID) {
                  this.userData.mlNotSeen.splice(i, 1);
              }
          }
          this.userData.mlHasSeen.push(movie);
          this.firebase.updateUserML(this.userData.id, this.userData);
      } else {
          for (let i = 0; i < this.userData.mlHasSeen.length; i++) {
              if (this.userData.mlHasSeen[i].movieID === movie.movieID) {
                  this.userData.mlHasSeen.splice(i, 1);
              }
          }
          this.userData.mlNotSeen.push(movie);
          this.firebase.updateUserML(this.userData.id, this.userData);
      }

  }
  getUserInfo(): User {
      const user = {
          name: this.afAuth.auth.currentUser.displayName,
          id: this.afAuth.auth.currentUser.uid,
          mlHasSeen: [],
          mlNotSeen: []
      };
      return user;
  }
  refreshUserInfo() {
      this.userData.id =  this.afAuth.auth.currentUser.uid;
      this.userData.name = this.afAuth.auth.currentUser.displayName;
      return this.firebase.retrieveUser(this.userData.id);

  }
  updateUserMovieList(hasSeen: Movie[], notSeen: Movie[]) {
      this.userData.mlHasSeen = hasSeen;
      this.userData.mlNotSeen = notSeen;
  }


  googleSignIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(authUserData => {
          this.userData.id = authUserData.user.uid;
          this.userData.name = authUserData.user.displayName;
          // console.log(this.userData);
          this.firebase.checkUser(this.userData.id)
              .subscribe(theBool => {
                // console.log('the bool is: ');
                // console.log(theBool);
                if (theBool) {
                  this.firebase.retrieveUser(this.userData.id)
                      .subscribe(dbUserData => {
                        // console.log('dbUserData is: ');
                        // console.log(dbUserData);
                        // @ts-ignore
                          this.userData.mlHasSeen = dbUserData.molHasSeen;
                          // @ts-ignore
                          this.userData.mlNotSeen = dbUserData.mlNotSeen;
                        console.log('userData is now: ');
                        console.log(this.userData);
                      });
                } else {
                  this.firebase.addUser(this.userData);
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



}
