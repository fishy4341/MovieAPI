import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import {User} from '../shared/user';
import {FirebaseService} from '../user-list/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth;
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
}
