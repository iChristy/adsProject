import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {elementShow} from '../../animations';
import {AuthService} from '../../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginInterface} from '../../interfaces/login-interface';
import {UserOldInterface} from '../../interfaces/user-old-interface';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [elementShow]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private cookieService: CookieService, private formBuilder: FormBuilder, private dataHandlerService: DataHandlerService) {
  }

  loginData: LoginInterface | undefined;
  formGroup: FormGroup;

  @Input() logged: boolean = false;
  @Output() setLogged = new EventEmitter();

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      login: 'disp4189',
      password: '7rXiw9'
    });
  }

  changeEntry() {
    // this.authService.login();
    this.authService.setCookie('tokens');
    this.setLogged.emit(true);
  }

  entry() {

    this.authService.loginJwt(JSON.stringify(this.loginData), this.loginData!.login, this.loginData!.password).subscribe(
      (data) => {
        console.log(data)
        const helper = new JwtHelperService()
        let tokens = JSON.parse(JSON.stringify(data))
        const decodedToken = helper.decodeToken(tokens.token_id)
        this.authService.setCookie(decodedToken)
        let decoding = JSON.parse(JSON.stringify(decodedToken.sub))
        let userData  = JSON.parse(decoding) as UserOldInterface
        console.log(userData.id)
        this.dataHandlerService.idUser = userData.id
        this.authService.login(userData.id)
        this.dataHandlerService.getStaticLists()
        this.setLogged.emit(true)
        // console.log(Object.keys(JSON.parse(decoding)).filter(u => u !== '_id'));
        // this.login_class = JSON.parse(decoding) as Login;
        // console.log(this.login_class);
        // console.log(decoding[1]);
        // localStorage.setItem('tk',tokens.token_id);
        // localStorage.setItem('role',this.login_class.role);
        // localStorage.setItem('company',this.login_class.company);
        // localStorage.setItem('char',this.login_class.char);
        // this.globals.char  = this.login_class.char;
        // localStorage.setItem('name',this.login_class.name);
        // localStorage.setItem('master',this.login_class.master);
        // localStorage.setItem('type',this.login_class.type);
        // localStorage.setItem('companyIDsocket',this.login_class.companyIDsocket);
        // if (this.login_class.role === 'dispmast') {localStorage.setItem('type', 'all');}
        // localStorage.setItem('id',this.login_class.id);
        // if (this.login_class.role === 'manager') {this.router.navigate(['/manage']);}
        // if (this.login_class.role === 'dispetcher') {this.router.navigate(['/disp']);}
        // if (this.login_class.role === 'dispmast') {this.router.navigate(['/dispmast']);}
        // if (this.login_class.role === 'master') {this.router.navigate(['/master']);}
        // if (this.login_class.role === 'chief') {this.router.navigate(['/chief']);}
      }, error => console.log(error)
    );
  }

  onSubmit(formGroup: FormGroup) {
    this.loginData = formGroup.getRawValue();
    this.entry();
  }
}
