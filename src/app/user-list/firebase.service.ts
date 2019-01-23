import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../shared/user";

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
    let result;
    let docRef = this.db.collection<AngularFirestoreDocument>('users', ref => ref.where('id', '==', `${userID}`));
    console.log(`Ref is: `);
    console.log(docRef);
    return docRef.snapshotChanges()
        // .pipe(
        //     map(observ =>{
        //
        //     })
        // );
    // return result;
  }


}
