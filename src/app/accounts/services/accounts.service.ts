import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../models/account.interface';

@Injectable()
export class AccountsService {
  accountsCollection?: AngularFirestoreCollection<Account>;

  constructor(firestore: AngularFirestore) {
    this.accountsCollection = firestore.collection<Account>('accounts');
  }

  create(account: Account): Observable<DocumentReference<Account>> | null {
    if (this.accountsCollection) {
      return from(this.accountsCollection.add(account));
    } else {
      console.error('firestore uninitialized.');
    }
    return null;
  }

  update(
    accountId: string,
    changes: Partial<Account>
  ): Observable<void> | null {

    if (!accountId) {
      console.error('no account id');
      return null;
    }
    if (this.accountsCollection) {
      return from(this.accountsCollection.doc(accountId).update(changes));
    } else {
      console.error('firestore uninitialized.');
    }
    return null;
  }

  getUser(accountId:string | null) {
    if (!accountId) {
      console.error('no account id');
      return null;
    }
    if (this.accountsCollection) {
      return from(this.accountsCollection.doc(accountId).snapshotChanges().pipe(
        map(actions => {
          const data = actions.payload.data() as Account;
          const id = actions.payload.id;
          return { id, ...data};
        }))
      );
    }
    return null;
  }
}
