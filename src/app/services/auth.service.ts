import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged: boolean = false;

  constructor() { }

  getLogged(): boolean {
    return this.logged;
  }

  login() {
    localStorage.setItem('logged', (this.logged = true).toString());
  }

  logout() {
    this.logged = false;
    localStorage.setItem('logged', (this.logged = false).toString());
  }
}
