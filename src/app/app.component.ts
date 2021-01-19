import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from './services/data-handler.service';
import {Zayavka} from './interfaces/Zayavka';
import {Houses} from './classes/Houses';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  opened: boolean = true;
  events: string[] = [];
  houses: Houses[];

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.getHttpZayavkiData();
    this.dataHandlerService.getHousesList();
    this.dataHandlerService.getStatusList();
    this.dataHandlerService.getTypeList();
    this.dataHandlerService.getKindList();
    this.dataHandlerService.getHttpContent();
    // this.houses = this.dataHandlerService.getHouses();
  }

  onOpenedChange(opened: boolean): void {
    this.opened = opened;
  }


  ngOnDestroy() {
    // this.dataHandlerService.getHttpZayavki().unsubscribe();
  }


}

const ZayavkiList: Zayavka =
  {
    "code" : 100,
    "contents" : [
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
    "dateWorkOff" : "",
    "dateWorkOn" : "18-10-2019  14:46",
    "companyId" : "usrCompany"
  };
