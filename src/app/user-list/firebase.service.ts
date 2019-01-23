import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import {map} from "rxjs/operators";
import {User} from "../shared/user";
import {Movie} from "../shared/movie";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
      private db: AngularFirestore
  ) { }


  addUser(user: User){
    this.db.collection('users').add(user)
        .then(res => console.log(res))
        .catch(err => console.error(err))
  }


  retrieveUser(userID: string){
    let docRef = this.db.collection<AngularFirestoreDocument>('users', ref => ref.where('id', '==', `${userID}`));
    // console.log(`Ref is: `);
    // console.log(docRef);
    return docRef.snapshotChanges()
        .pipe(
            map(action =>{
              // console.log('payload is: ');
              // console.log(action[0].payload.doc.data());
              return action[0].payload.doc.data();
            })
        );
  }


  updateUserML(userID: string, list: Movie[]){
    let docRef = this.db.collection<AngularFirestoreDocument>('users', ref => ref.where('id', '==', `${userID}`));
  }


}
