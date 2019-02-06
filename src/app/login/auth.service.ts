import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import {map, takeUntil} from 'rxjs/operators';
import {User} from '../shared/user';
import {FirebaseService} from '../user-list/firebase.service';
import {Subject} from "rxjs";
import {subscribeToObservable} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth;
  private unsubscribe$ = new Subject();
  private userData: User = {
    name: '',
    id: '',
  };

  constructor(
      public afAuth: AngularFireAuth,
      private firebase: FirebaseService,
  ) {

  }


  googleSignIn() {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
          .then(authUserData => {
              this.userData.id = authUserData.user.uid;
              this.userData.name = authUserData.user.displayName;
              this.firebase.getUserData().pipe(
                  takeUntil(this.unsubscribe$),
                  (userData =>{
                      if (!userData) {
                          this.firebase.addUser({
                              name: this.userData.name,
                              id: this.userData.id
                          });
                      }
                  }) // already here end up sub callback
              ) //already here end of pipe
          }); //already here end of .then
  } //already here end of google sign in

  signOut() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(
      map(user => user && user.uid ? true : false));
  }
}
