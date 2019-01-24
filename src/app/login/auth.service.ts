import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import {User} from "../shared/user";
import {FirebaseService} from "../user-list/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth;
  public userData: User = {
    name: '',
    id: '',
    movieList: []
  };

  constructor(
      public afAuth: AngularFireAuth,
      private firebase: FirebaseService
  ) {

  }


  googleSignIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(authUserData => {
          this.userData.id = authUserData.user.uid;
          this.userData.name = authUserData.user.displayName;
          // console.log(this.userData);
          this.firebase.checkUser(this.userData.id)
              .subscribe(theBool => {
                console.log('the bool is: ');
                console.log(theBool);
                if(theBool){
                  this.firebase.retrieveUser(this.userData.id)
                      .subscribe(dbUserData =>{
                        console.log('dbUserData is: ');
                        console.log(dbUserData);
                        // @ts-ignore
                          this.userData.movieList = dbUserData.movieList;
                        console.log('userData is now: ');
                        console.log(this.userData);
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
