import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      public afAuth: AngularFireAuth
  ) {

  }


  googleSignIn(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  signOut(){
    this.afAuth.auth.signOut();
  }


}
