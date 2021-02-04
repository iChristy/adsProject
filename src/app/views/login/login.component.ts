import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {elementShow} from '../../animations';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [elementShow]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @Input() logged: boolean = false;
  @Output() setLogged = new EventEmitter();
  ngOnInit(): void {
  }

  changeEntry() {
    this.authService.login();
    this.setLogged.emit(true);
  }

}
