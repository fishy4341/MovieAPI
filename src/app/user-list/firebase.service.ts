import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {User} from '../shared/user';
import {Movie, Movie2} from '../shared/movie';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
      private db: AngularFirestore,
      private afAuth: AngularFireAuth
  ) { }


  addUser(user: User) {
    this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).set(user);
  }


  retrieveUser(userID: string) {
    const docRef = this.db.collection<AngularFirestoreDocument>('users', ref => ref.where('id', '==', `${userID}`));
    // console.log(`Ref is: `);
    // console.log(docRef);
    return docRef.snapshotChanges()
        .pipe(
            map(action => {
              // console.log('payload is: ');
              // console.log(action[0].payload.doc.data());
              return action[0].payload.doc.data();
            })
        );
  }
  retrieveUserData() {
      return this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).valueChanges();
  }
  updateMLHasSeen(movie: Movie) {
      this.retrieveUserData().subscribe(docData => {
          let found = false;
          // @ts-ignore
          for (let i = 0; i < docData.mlHasSeen.length; i++) {
              // @ts-ignore
              if (docData.mlHasSeen[i].movieID === movie.movieID) {
                  found = true;
                  // @ts-ignore
                  docData.mlHasSeen[i] = movie;
                  // @ts-ignore
                  this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).update({'mlHasSeen': docData.mlHasSeen});
              }
          }
          if (!found) {
              // @ts-ignore
              docData.mlHasSeen.push(movie);
              // @ts-ignore
              this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).update({'mlHasSeen': docData.mlHasSeen});
          }
      });
  }
  getDocRef(userID: string) {
    const docRef = this.db.collection<AngularFirestoreDocument>('users', ref => ref.where('id', '==', `${userID}`));
    // console.log(docRef);
    return docRef.snapshotChanges()
        .pipe(
            map(action => {
                // console.log('action is: ');
                // console.log(action[0].payload);
              return action[0].payload.doc.ref;
            })
        );
  }
  updateUserML(userID: string, data: User) {
      this.getDocRef(userID)
          .subscribe(sub => {
            // console.log('sub.id is: ');
            // console.log(sub.id);
            // console.log(sub);
            this.db.doc(sub).update(data)
                .then(res => console.log(res))
                .catch(err => console.error(err));
            }
        );
  }
  checkUser(userID: string): Observable<boolean> {
      const docRef = this.db.collection<AngularFirestoreDocument>('users', ref => ref.where('id', '==', `${userID}`));
      // console.log(`Ref is: `);
      // console.log(docRef);
      return docRef.snapshotChanges()
          .pipe(
              map(action => {
                  // console.log(action.length);
                  if (action.length === 0) {
                      // console.log('false');
                      return  false;
                  } else if (action.length === 1) {
                      // console.log('true');
                      return true;
                  } else {
                      console.log('There are duplicates of that user');
                  }
              })
          );
      // return docRef.snapshotChanges().subscribe(subVar => {
      //     console.log(subVar);
      // })
  }

    getHasSeen() {
        return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).valueChanges();
    }

    getToSee() {
        return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).valueChanges();
    }

    pushHasSeen(movie: Movie2) {
      this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc(String(movie.movieID)).set(movie);
    }

    pushToSee(movie: Movie2) {
      this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).doc(String(movie.movieID)).set(movie);
    }

    removeHasSeen(movieId) {
      return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasSeen`).doc(String(movieId)).delete();
    }

    removeToSee(movieId) {
        return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toSee`).doc(String(movieId)).delete();
    }


}
