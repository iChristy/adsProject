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

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.connectToWebSocket();
    this.dataHandlerService.getHousesList();
  }

  onOpenedChange(opened: boolean): void {
    this.opened = opened;
  }

  ngOnDestroy() {
    // this.dataHandlerService.getHttpZayavki().unsubscribe();
  }
}

const ZayavkiList: ZayavkaInterface =
  {
    "code" : 100,
    "services" : [
      "Демонтаж змеевика (полотенцесушителя)!!!!",
      "Демонтаж запорной арматуры",
      "Демонтаж заглушки"
    ],
    "price" : "0",
    "email" : "",
    "address" : "г. Пермь, ул. Серебрянский проезд, д. 16",
    "phone" : "89076523452",
    "time" : "48",
    "actions" : "",
    "status" : "принято",
    "prefix" : "УАА",
    "houseGuid" : "9205d0ff-ff0c-4d98-8407-0343f3368cd2",
    "flatNum" : "12",
    "flatGuid" : "",
    "dispatcherId" : "PDCvH0p7BT",
    "masterId" : "PDCvH0p7BT",
    "workerId" : "",
    "materials" : "",
    "picId" : -1,
    "dateBegin" : "18-10-2019  14:46",
    "fioOwner" : "Быстров Владимир Гаврилович",
    "dateDeadline" : "20-10-2019  14:45",
    "fioSecondary" : "",
    "dateComplete" : "",
    "comment" : "",
    "typeWork" : "Сантехнические",
    "kindWork" : "Аварийная",
    "cancelReason" : "",
    "dateWorkEnd" : "",
    "dateWorkStart" : "18-10-2019  14:46",
    "companyId" : "usrCompany"
  };
