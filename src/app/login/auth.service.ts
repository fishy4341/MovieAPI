import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import {User} from "../shared/user";
import {FirebaseService} from "../user-list/firebase.service";
import {Movie} from "../shared/movie";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth;
  private userData: User = {
    name: '',
    id: '',
    movieList: []
  };

  constructor(
      public afAuth: AngularFireAuth,
      private firebase: FirebaseService
  ) {

  }

  addMovieToUser(movie: Movie){
      this.userData.movieList.push(movie);
      this.firebase.updateUserML(this.userData.id, this.userData);
  }
  getUserInfo(): User{
      return this.userData;
  }
  refreshUserInfo(): void{
      this.userData.id =  this.afAuth.auth.currentUser.uid;
      this.userData.name = this.afAuth.auth.currentUser.displayName;
      this.firebase.retrieveUser(this.userData.id)
          .subscribe(dbUserData => {
              // @ts-ignore
              this.userData.movieList = dbUserData.movieList;
          })

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
                if(theBool){
                  this.firebase.retrieveUser(this.userData.id)
                      .subscribe(dbUserData =>{
                        // console.log('dbUserData is: ');
                        // console.log(dbUserData);
                        // @ts-ignore
                          this.userData.movieList = dbUserData.movieList;
                        // console.log('userData is now: ');
                        // console.log(this.userData);
                      })
                }
                else{
                  this.firebase.addUser(this.userData);
                }
              })
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
