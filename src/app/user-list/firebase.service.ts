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
  getDocRef(userID: string){
    let docRef = this.db.collection<AngularFirestoreDocument>('users', ref => ref.where('id', '==', `${userID}`));
    // console.log(docRef);
    return docRef.snapshotChanges()
        .pipe(
            map(action =>{
                // console.log('action is: ');
                // console.log(action[0].payload);
              return action[0].payload.doc.ref;
            })
        )
  }
  async updateUserML(userID: string, data: User){
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

}
