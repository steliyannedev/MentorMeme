import { Injectable } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  id: string | null;
  email: string | null;
}

const initialAuthState = {
  isLoggedIn: false,
  username: null,
  id: null,
  email: null
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _authState = new BehaviorSubject<AuthState>(
    initialAuthState
  );
  readonly auth$ = this._authState.asObservable();
  readonly isLoggedIn$ = this.auth$.pipe(map(state => state.isLoggedIn))

  constructor() {
    Auth.currentAuthenticatedUser().then(
      (user: any) => this.setUser(user),
      _err => this._authState.next(initialAuthState)
    );
    Hub.listen('auth', ({payload: {event, data, message}})=>{
      if (event === 'signIn'){
        this.setUser(data)
      }else{
        this._authState.next(initialAuthState)
      }
    })
  }
  private setUser(user: any) {
    if (!user) {
      return;
    }
    const {
      attributes: { sub: id, email },
      username
    } = user;

    this._authState.next({ isLoggedIn: true, id, username, email });
  }
}
