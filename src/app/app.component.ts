import { Component, OnInit, OnDestroy} from '@angular/core';
import {DataHandlerService} from './services/data-handler.service';
import {ZayavkaInterface} from './interfaces/ZayavkaInterface';
import {Houses} from './classes/Houses';
import {elementShow} from './animations';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [elementShow]
})
export class AppComponent implements OnInit, OnDestroy{

  opened: boolean = true;
  events: string[] = [];
  houses: Houses[] = [];
  logged: boolean = false;

  constructor(private dataHandlerService: DataHandlerService, private authService: AuthService) {
  }

  ngOnInit() {
    // this.dataHandlerService.connectToWebSocket();
    this.dataHandlerService.getStaticLists();
    this.logged = this.authService.getLogged();
  }

  onOpenedChange(opened: boolean): void {
    this.opened = opened;
  }

  ngOnDestroy() {
    this.dataHandlerService.unsubscribeLists();
  }

  logout($event: any) {
    this.logged = false;
    this.authService.logout();
  }

  login($event: any) {
    this.logged = true;
    this.authService.login();
  }


}
