import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {auth, User} from 'firebase/app';
import {User as OurUser} from "../shared/user";
import {map, takeUntil, tap} from 'rxjs/operators';
import {FirebaseService} from '../user-list/firebase.service';
import {Observable, Subject} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private unsubscribe$ = new Subject();
  private userData: OurUser = {
    name: '',
    id: '',
  };

  constructor(
      public afAuth: AngularFireAuth,
      private firebase: FirebaseService
  ) {

  }


  googleSignIn() {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
          .then((authUserData: UserCredential) => {
              this.userData.id = authUserData.user.uid;
              this.userData.name = authUserData.user.displayName;
              this.firebase.getUserData().pipe(
                  takeUntil(this.unsubscribe$),
                  tap((userData: OurUser) => {
                      if (!userData) {
                          this.firebase.addUser({
                              name: this.userData.name,
                              id: this.userData.id
                          });
                      }
                  }) // already here end up sub callback
              ).subscribe(); // already here end of pipe
          }); // already here end of .then
  } // already here end of google sign in

  signOut() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.afAuth.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => user && user.uid ? true : false));
  }
  userNameObs(): Observable<User>{
      return this.afAuth.authState;

  }
}
