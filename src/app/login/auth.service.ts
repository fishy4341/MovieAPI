import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth;

  constructor(
      public afAuth: AngularFireAuth
  ) {

  }


  googleSignIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(
      map(user => user && user.uid ? true : false));
  }
}
