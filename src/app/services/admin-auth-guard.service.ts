import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService
  ) {}

  canActivate(): Observable<boolean>  {
   return this.auth.appUser$.pipe(
      map((appUser: AppUser | null) => appUser?.isAdmin ?? false)
    ); 
  }
}
