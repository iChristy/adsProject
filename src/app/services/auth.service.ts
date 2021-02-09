import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserOldInterface} from '../interfaces/user-old-interface';
import {LoginInterface} from '../interfaces/login-interface';
import {Data} from '@angular/router';
import {DataHandlerService} from './data-handler.service';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  logged: boolean = false;
  private urlJwt = 'http://89.108.82.118:31055/jwt_se/jjwt';


  constructor(private httpClient : HttpClient, private cookieService: CookieService, private dataHandlerService: DataHandlerService) { }

  getLogged(): boolean {
    return this.logged;
  }

  setLogged() {
    this.logged = true;
  }

  logout() {
    this.cookieService.delete('token_')
    this.logged = false
    this.dataHandlerService.unsubscribeLists()
  }

  httpJwt(_object: any, user: string, pass: string)
  {
    return this.httpClient.get(this.urlJwt + '?username=' + user + '&password=' + pass, _object);
  }

  setCookie(token_: string) {
    let dateExpire = new Date();
    console.log(dateExpire.setTime(dateExpire.getTime() + (20* 60 * 1000)));
    this.cookieService.set('token_', token_,  0.0138889);
  }

  checkAuthToken() {
    return this.logged = this.cookieService.get('token_') ? true : false;
  }

  getDataFromToken(tokenId: string) {
    const helper = new JwtHelperService()
    const decodedToken = helper.decodeToken(tokenId)
    let decoding = JSON.parse(JSON.stringify(decodedToken.sub))
    let userData  = JSON.parse(decoding) as UserOldInterface
    this.dataHandlerService.idUser = userData.id
    this.dataHandlerService.getStaticLists()
  }

  login(loginData: LoginInterface) {
    this.httpJwt(JSON.stringify(loginData), loginData.login, loginData.password).subscribe(
      (data) => {
        console.log(data)
        let tokens = JSON.parse(JSON.stringify(data))
        this.getDataFromToken(tokens.token_id)

        this.setCookie(tokens.token_id)
        this.checkAuthToken()
      }, error => console.log(error)
    );
  }
}
