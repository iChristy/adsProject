import { Component, OnInit, OnDestroy} from '@angular/core';
import {DataHandlerService} from './services/data-handler.service';
import {ZayavkaInterface} from './interfaces/ZayavkaInterface';
import {Houses} from './classes/Houses';
import {elementShow} from './animations';

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
  entry: boolean = false;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    // this.dataHandlerService.connectToWebSocket();
    this.dataHandlerService.getStaticLists();
  }

  onOpenedChange(opened: boolean): void {
    this.opened = opened;
  }

  ngOnDestroy() {
    this.dataHandlerService.unsubscribeLists();
  }

  entrySet(event: any) {
    console.log(event);
    this.entry = event;
  }
}
