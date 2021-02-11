import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() opened: boolean = true;
  @Input() logged: boolean = false;
  @Output() setLogged = new EventEmitter();
  @Output() openedChange = new EventEmitter();

  constructor(private dataHandlerService: DataHandlerService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onOpenedChange(): void {
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);
  }

  checkWs() {
    this.dataHandlerService.sendTestZayavka();
  }

  exit() {
    this.authService.logout();
    this.setLogged.emit(false);
  }

}
