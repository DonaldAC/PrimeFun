import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { CreateUserWithEmailDto } from '../accounts/models/create-user.dto';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  state$;
  constructor(private auth: AngularFireAuth) {
    this.state$ = auth.authState;
  }
  signUp(userDto: CreateUserWithEmailDto) {
    return new Observable<firebase.User>((subscriber) => {
      if (!userDto.email || !userDto.password) {
        subscriber.error('empty email or password');
        return;
      }
      this.auth
        .createUserWithEmailAndPassword(userDto.email, userDto.password)
        .then((credentials) => {
          let user = credentials.user;
          if (!user) throw new Error('unexpected null in user data');
          return user;
        })
        .then((user) => {
          console.log('this is the user', user);
          subscriber.next(user);
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }
  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }
  logout() {
    return this.auth.signOut();
  }
}
