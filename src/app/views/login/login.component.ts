import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {elementShow} from '../../animations';
import {AuthService} from '../../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  loginData: LoginInterface;
  formGroup: FormGroup;

  @Input() logged: boolean = false;
  @Output() setLogged = new EventEmitter();

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password:  ['', Validators.required]
    });
  }

  entry() {
    this.authService.login(this.loginData);
  }

  onSubmit(formGroup: FormGroup) {
    this.loginData = formGroup.getRawValue();
    this.entry();
  }
}
