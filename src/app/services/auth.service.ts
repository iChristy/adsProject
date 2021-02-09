import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  logged: boolean = false;
  private urlJwt = 'http://89.108.82.118:31055/jwt_se/jjwt';


  constructor(private httpClient : HttpClient, private cookieService: CookieService) { }

  getLogged(): boolean {
    return this.logged;
  }

  login(idUser: string) {
    localStorage.setItem('logged', (this.logged = true).toString());

  }

  logout() {
    this.logged = false;
    localStorage.setItem('logged', (this.logged = false).toString());
  }

  loginJwt(_object: any, user: string, pass: string)
  {
    return this.httpClient.get(this.urlJwt + '?username=' + user + '&password=' + pass, _object);
  }

  setCookie(token_: string) {
    let dateExpire = new Date();
    console.log(dateExpire.setTime(dateExpire.getTime() + (20* 60 * 1000)));
    this.cookieService.set('token_', token_,  0.0138889);
  }

  getDataFromToken() {

  }
}
