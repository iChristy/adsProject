import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {elementShow} from '../../animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [elementShow]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() entry: boolean;
  @Output() setEntry = new EventEmitter();
  ngOnInit(): void {
  }

  changeEntry() {
    this.setEntry.emit(false);
  }

}
