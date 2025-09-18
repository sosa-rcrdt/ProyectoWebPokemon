import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() { }

  // Ejemplo de login demo
  loginDemoSdmin() : void {
    this.currentUser$.next({
      id : 1,
      name: 'Admin',
      email: 'admin@pokemon.com',
      role: 'admin',
    });
  }

  logout() : void {
    this.currentUser$.next(null);
  }
}