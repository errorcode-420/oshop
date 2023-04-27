import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, map, of, switchMap } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserService } from '../data/user.service';
import { AppUser } from '../../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<firebase.User>;  

  constructor(
    private fireAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private userService: UserService
    ) { 
    this.user$ = fireAuth.authState as Observable<firebase.User>;
  }
  
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  logout() {
    this.fireAuth.signOut();
  }

  get appUser$(): Observable<AppUser | null> {

    return this.user$.pipe(
      switchMap(user => {
        if(user) return this.userService.get(user.uid).valueChanges();
        return of(null);
      })
    ); 
  }
}
