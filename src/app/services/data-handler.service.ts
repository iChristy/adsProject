import {Injectable} from '@angular/core';
import {Zayavka} from '../classes/Zayavka';
import {BehaviorSubject, forkJoin, Observable, of, ReplaySubject} from 'rxjs';
import {GetDataService} from './get-data.service';
import {Houses} from '../classes/Houses';
import {Status} from '../classes/Status';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Company} from '../classes/Company';
import {User} from '../classes/User';
import {KindWork} from '../classes/KindWork';
import {TypeWork} from '../classes/TypeWork';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
import {Content} from '../classes/Content';
import {Flats} from '../classes/Flats';
import {CitizenInfo} from '../classes/CitizenInfo';
import {Disconnection} from '../classes/Disconnection';
import {ZayavkaInterface} from '../interfaces/ZayavkaInterface';
import {WebSocketService} from './web-socket.service';
import {Sending} from '../classes/Sending';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  webSocketURL: string = 'ws://10.10.10.41:8097/wsSocket/ws/';
  idUser: string = 'PDCvH0p7BT';

  zayavkiList: Zayavka[] = [];
  disconnectionsList: Disconnection[] = [];
  employeeList: User[] = [];
  contents: Content[] = [];
  flatsList: Flats[] = [];
  citizenInfoList: CitizenInfo[] = [];

  housesList = new BehaviorSubject<Houses[]>([]);
  statusList = new BehaviorSubject<Status[]>([]);
  typeList = new BehaviorSubject<TypeWork[]>([]);
  kindList = new BehaviorSubject<KindWork[]>([]);
  zayavkiSubject = new BehaviorSubject<Zayavka[]>([]);
  currentZayavka = new BehaviorSubject<Zayavka>(new Zayavka());
  currentUser = new BehaviorSubject<User>(new User());
  workers = new BehaviorSubject<User[]>([]);
  masters = new BehaviorSubject<User[]>([]);
  dispatchers = new BehaviorSubject<User[]>([]);
  dispatchersMasters = new BehaviorSubject<User[]>([]);
  disconnectionsSubject = new BehaviorSubject<Disconnection[]>([]);
  flatsSubject = new BehaviorSubject<Flats[]>([]);
  citizenInfoSubject = new BehaviorSubject<CitizenInfo[]>([]);


  constructor(private getDataService: GetDataService, private webSocketService: WebSocketService) {
  }

  // webSocket

  connectToWebSocket() {
    this.webSocketService.createObservableSocket(this.webSocketURL + this.idUser).subscribe(ws => {
      let wsJSON: Sending = JSON.parse(ws);
      console.log(wsJSON);
      let wsType: string = wsJSON.type;
      let wsAction: string = wsJSON.action;
      console.log(wsJSON.content[0]);
      let wsContent: any = JSON.parse(wsJSON.content[0]);
      switch (wsType) {
        case 'MESSAGE' :
          console.log('message');
          this.wsZayavki(wsAction, wsContent);
          break;
        default :
          console.log();
          break;
      }
    }, error => {
      console.log(error)
    });
  }

  wsZayavki(action_: string, content_: any) {
    switch (action_) {
      case 'CREATE' : {
        this.zayavkiList.push(content_);
        this.zayavkiSubject.next(this.zayavkiList);
        break;
      }
      case 'UPDATE' : {
        this.wsZayavkiUpdate(content_);
        break;
      }
      default: {
        console.log('def');
        break;
      }
    }
  }

  wsZayavkiUpdate(content_: any) {
    let updateContent = content_;
    let updateCode = -1;
    let updatePrefix = '';
    Object.keys(updateContent).forEach(key => {
      switch (key) {
        case 'code' : {
          updateCode = Object(updateContent)[key];
          delete Object(updateContent)[key];
          break;
        }
        case 'prefix' : {
          updatePrefix = Object(updateContent)[key];
          delete Object(updateContent)[key];
          break;
        }
        default:
          break;
      }
    });
    this.updateZayavka(updateCode, updatePrefix, updateContent);
  }

  // send

  sendNewZayavka() {
    let stringSending = JSON.stringify({from: this.idUser, to: ['2'], content: [ZayavkaNew], action: 'CREATE', type: 'MESSAGE'});
    console.log(stringSending);
    this.webSocketService.sendMessage(stringSending);
  }

  // Дома /  статусы / типы / контенты / виды

  getStaticLists() {
    this.flatsList = [];
    this.citizenInfoList = [];

    let staticLists = this.getDataService.getHousesList()
      .pipe(mergeMap(
        (houses_: Houses[]) => {
          // дома
          this.housesList.next(houses_);
          // контенты
          const contents_ = this.getDataService.getContentList();
          // статус
          const status_ = this.getDataService.getStatusList();
          // типы
          const type_ = this.getDataService.getTypeList();
          // виды
          const kind_ = this.getDataService.getKindList();
          return forkJoin([contents_, status_, type_, kind_]);
        }
      ))
      .subscribe(
        result => {
          this.contents = result[0];
          this.statusList.next(result[1]);
          this.typeList.next(result[2]);
          this.kindList.next(result[3]);
          this.getDynamicLists();
        }
      );

    return staticLists;
  }

  //  Заявки / юзеры / компания / отключения / квартиры / инфо

  getDynamicLists() {
    let dynamicLists = this.getDataService.getCurrentUser()
      .subscribe(
        user => {
          console.log(user);
          let currentUser = user.find(data => data.id === this.idUser);
          this.displayUsers(user, currentUser!);
          if (currentUser) {
            this.currentUser.next(currentUser);
            this.getDataService.getCurrentCompany()
              .pipe(
                // компания
                map(data => {
                    const company = data.find(data => data.companyId === currentUser?.companyId);
                    return company!;
                  }
                ),
                mergeMap((company: Company) => {
                  // заявки
                  const zayavki_ = this.getDataService.getZayavkiList().pipe(
                    map(data => data.filter(data => data.companyId === company.companyId))
                  );
                  // отключения
                  const disconnections_ = this.getDataService.getDisconnections(company.companyId).pipe(
                    map(disc => {
                        this.housesList.getValue().forEach(house =>
                          disc.forEach(data => {
                            if (data.houseGuid === house.houseGuid) {
                              data.address = house.address;
                            }
                          }));
                        return disc;
                      }
                    ));
                  // квартиры
                  const flats_ = this.getDataService.getFlatsList(company.companyId);
                  // инфо
                  const info_ = this.getDataService.getCitizenInfoList(company.companyId);

                  return forkJoin([zayavki_, disconnections_, flats_, info_]);
                })
              ).subscribe(
              result => {
                this.zayavkiList = result[0];
                this.zayavkiSubject.next(this.zayavkiList);
                this.disconnectionsSubject.next(result[1]);
                this.flatsSubject.next(result[2]);
                this.citizenInfoSubject.next(result[3]);
              }
            );
          } else {
            console.log('user не найден');
          }
        }
      );
    return dynamicLists;
  }

  // отписка

  unsubscribeLists() {
    this.getDynamicLists().unsubscribe();
    this.getStaticLists().unsubscribe();
  }

  // имена юзеров

  displayUsers(user: User[], currentUser: User) {
    this.workers.next(user.filter(data => data.companyId === currentUser?.companyId && data.role === 'worker'));
    this.masters.next(user.filter(data => data.companyId === currentUser?.companyId && data.role === 'master'));
    this.dispatchers.next(user.filter(data => data.companyId === currentUser?.companyId && data.role === 'dispatcher'));
    this.dispatchersMasters.next(user.filter(data => data.companyId === currentUser?.companyId && data.role === 'dispatcherMaster'));
    this.employeeList = user.filter(user => user.companyId === currentUser?.companyId);
  }

  displayCheckedUsers(userId_: string): string {
    let nameUser_ = '';
    switch (userId_) {
      case 'workerId' :
        nameUser_ = this.employeeList.find(data => data.companyId === this.currentUser.getValue().companyId && data.role === 'worker')!.name;
        break;
      case 'masterId' :
        nameUser_ = this.employeeList.find(data => data.companyId === this.currentUser.getValue().companyId && data.role === 'master')!.name;
        break;
      case 'dispatcherId' :
        nameUser_ = this.employeeList.find(data => data.companyId === this.currentUser.getValue().companyId && data.role === 'dispatcher' ||
          this.currentUser.getValue().companyId && data.role === 'dispatcher')!.name;
        break;
      default:
        nameUser_ = '';
        break;
    }
    return nameUser_;
  }

  // отображение выбранной заявки

  setCurrentZayavka(zayavka: Zayavka) {
    return this.currentZayavka.next(zayavka);
  }

  // добавление заявки

  addNewZayavka(zayavka: Zayavka) {
    let listPrefix = this.zayavkiList.filter(z => z.prefix == this.currentUser.getValue().ownPrefix);
    let idZayavaka = Math.max.apply(Math, listPrefix.map(list => list.code)) + 1;

    zayavka.code = idZayavaka;
    zayavka.prefix = this.currentUser.getValue().ownPrefix!;
    zayavka.dateBegin = this.formatOfDateString(formatDate(new Date(), 'dd-MM-yyyy HH:mm', 'en-GB'));
    zayavka.status = zayavka.workerId ? 'назначено' : 'принято';
    let momentDate = moment(zayavka.dateBegin, 'DD-MM-YYYY HH:mm').toDate();
    momentDate.setHours(momentDate.getHours() + parseInt(zayavka.time));
    zayavka.dateDeadline = formatDate(momentDate.toString(), 'dd-MM-yyyy HH:mm', 'en-US', '+0500');

    // @ts-ignore
    zayavka.address = this.housesList.getValue() ? this.housesList.getValue().find(house => house.houseGuid === zayavka.houseGuid).address : '';
    zayavka.dispatcherId = this.currentUser.getValue().id;
    this.zayavkiList.push(zayavka);
    console.log(this.zayavkiList);
    this.zayavkiSubject.next(this.zayavkiList);
  }

  // ап заявки

  updateZayavka(code: number, prefix: string, updateFields: object) {
    let findZayavka: Zayavka;
    let finder = this.zayavkiList.find(zayavki => zayavki.prefix === prefix && zayavki.code === code);
    if (finder !== undefined) {
      findZayavka = finder;
      let ind = this.zayavkiList.indexOf(findZayavka);
      Object.keys(updateFields).forEach(keyUpdates =>
        Object.keys(findZayavka).forEach(key => key === keyUpdates ? Object(findZayavka)[key] = Object(updateFields)[key] : '')
      );
      console.log(this.zayavkiList);
      this.zayavkiList.splice(ind, 1, findZayavka);
      this.zayavkiSubject.next(this.zayavkiList);
    } else {
      alert('Не удалось добавить заявку');
    }
  }

  // новое отключение

  setNewDisconnection(disconnection: Disconnection) {
    // return Math.max.apply(Math, this.disconnectionsSubject.getValue()!.map(disconnection => disconnection.id)) + 1;
    let disconnections = this.disconnectionsSubject.getValue();
    disconnections.push(disconnection);
    this.disconnectionsSubject.next(disconnections);
  }

  // ап отключения

  updateDisconnection(disconnection: Disconnection) {
    let disconnections = this.disconnectionsSubject.getValue();
    disconnections = disconnections.filter(disconnection_ => disconnection_.id !== disconnection.id);
    this.disconnectionsSubject.next(disconnections);
  }

  // формат дат

  formatStringToDate(dateString: string) {
    return moment(dateString, 'DD-MM-YYYY HH:mm').toDate();
  }

  formatOfDateString(dateString: string) {
    let date = moment(dateString, 'DD-MM-YYYY HH:mm').toDate();
    return formatDate(new Date(date), 'dd-MM-yyyy HH:mm', 'en-GB');
  }

  formatOfDate() {
    return formatDate(new Date(), 'dd-MM-yyyy HH:mm', 'en-GB');
  }

  formatDateToString(newDate: Date) {
    return formatDate(newDate, 'dd-MM-yyyy HH:mm', 'en-GB');
  }

  formatOfDiscDate(dateString: string) {
    let date = moment(dateString, 'DD-MM-YYYY').toDate();
    return formatDate(new Date(date), 'dd-MM-yyyy', 'ru-RU');
  }

  // Фильтр контентов

  getContentList(type: string, kind: string) {
    console.log(this.contents);
    if (kind === 'Платная') {
      return this.contents.filter(content => content.typeWork === type && content.price);
    } else {
      return this.contents.filter(content => content.typeWork === type && content.time);
    }
    return;
  }

  // Фильтр заявок

  filters(text?: string, houseGuid?: string, intervalStart?: Date, intervalEnd?: Date, status?: string, type?: string, kind?: string) {
    console.log(`${text} - ${intervalStart} - ${intervalEnd} - ${houseGuid} - ${status} - ${type} - ${kind}`);
    let filterZayavki = this.zayavkiList;
    if (intervalStart !== undefined && intervalStart !== null) {
      if (intervalEnd !== undefined && intervalEnd !== null) {
        let timeStart = intervalStart.getTime();
        let timeEnd = intervalEnd.getTime();
        filterZayavki = filterZayavki.filter(zayavka => {
            let dateBegin = moment(zayavka.dateBegin, 'DD-MM-YYYY 00:00').toDate().getTime();
            return dateBegin >= timeStart && dateBegin <= timeEnd;
          }
        );
      }
    }
    if (text !== undefined && text !== '') {
      filterZayavki = filterZayavki.filter(zayavka => zayavka.address.toUpperCase().includes(<string> text?.toUpperCase()));
    }
    if (kind !== null && kind !== undefined && kind !== '') {
      filterZayavki = filterZayavki.filter(z => z.kindWork === kind);
    }
    if (type !== null && type !== undefined && type !== '') {
      filterZayavki = filterZayavki.filter(z => z.typeWork === type);
    }
    if (status !== null && status !== undefined && status !== '') {
      filterZayavki = filterZayavki.filter(z => z.status === status);
    }
    if (houseGuid !== undefined && houseGuid !== null && houseGuid !== '') {
      console.log('v domah');
      filterZayavki = filterZayavki.filter(z => z.houseGuid === houseGuid);
    }
    return filterZayavki;
  }

  // Фильтр отключения

  filtersDisconnections(text?: string, houseGuid?: string, intervalStart?: Date, intervalEnd?: Date, type?: string, initiator?: string) {
    console.log(`${text} - ${houseGuid} - ${type} - ${intervalStart} - ${intervalEnd} - ${initiator}`);
    let filterDisconnections = this.disconnectionsSubject.getValue();
    if (intervalStart !== undefined && intervalStart !== null) {
      if (intervalEnd !== undefined && intervalEnd !== null) {
        let timeStart = intervalStart.getTime();
        let timeEnd = intervalEnd.getTime();
        filterDisconnections = filterDisconnections.filter(disconnection => {
            let intervalStart = moment(disconnection.interval[0], 'DD-MM-YYYY 00:00').toDate().getTime();
            let intervalEnd = moment(disconnection.interval[1], 'DD-MM-YYYY 00:00').toDate().getTime();
            return intervalStart >= timeStart && intervalEnd <= timeEnd;
          }
        );
      }
    }
    if (text !== undefined && text !== '') {
      filterDisconnections = filterDisconnections.filter(disconnection => disconnection.address!.toUpperCase().includes(<string> text?.toUpperCase()));
    }
    if (type !== null && type !== undefined && type !== '') {
      filterDisconnections = filterDisconnections.filter(d => d.typeWork === type);
    }
    if (houseGuid !== undefined && houseGuid !== null && houseGuid !== '') {
      console.log(filterDisconnections);
      console.log(houseGuid);
      filterDisconnections = filterDisconnections.filter(d => d.houseGuid === houseGuid);

    }
    if (initiator !== undefined && initiator !== null && initiator !== '') {
      filterDisconnections = filterDisconnections.filter(d => d.initiator === initiator);
    }
    return filterDisconnections;
  }
}


const ZayavkaNew: Zayavka = {
    'code': 6,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Серебрянский проезд, д. 16',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'принято',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  };

const ZayavkiTest: Zayavka[] = [
  {
    'code': 6,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Серебрянский проезд, д. 16',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'принято',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 7,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Уинская, д. 40',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'назначено',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 8,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Уинская, д. 40',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'закрыто',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 9,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Серебрянский проезд, д. 16',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'принято',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 10,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Уинская, д. 40',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'выполнено',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 11,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Серебрянский проезд, д. 16',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'принято',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 12,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Уинская, д. 40',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'назначено',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 13,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Уинская, д. 40',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'закрыто',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 14,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Серебрянский проезд, д. 16',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'принято',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 15,
    'services': [
      'Демонтаж змеевика (полотенцесушителя)!!!!',
      'Демонтаж запорной арматуры',
      'Демонтаж заглушки'
    ],
    'price': '0',
    'email': '',
    'address': 'г. Пермь, ул. Уинская, д. 40',
    'phone': '89076523452',
    'time': '48',
    'actions': '',
    'status': 'выполнено',
    'prefix': 'УАА',
    'houseGuid': '9205d0ff-ff0c-4d98-8407-0343f3368cd2',
    'flatNum': '12',
    'flatGuid': '',
    'dispatcherId': 'PDCvH0p7BT',
    'masterId': 'PDCvH0p7BT',
    'workerId': '',
    'materials': '',
    'picId': -1,
    'dateBegin': '18-10-2019  14:46',
    'fioOwner': 'Быстров Владимир Гаврилович',
    'dateDeadline': '20-10-2019  14:45',
    'fioSecondary': '',
    'dateComplete': '',
    'comment': '',
    'typeWork': 'Сантехнические',
    'kindWork': 'Аварийная',
    'cancelReason': '',
    'dateWorkEnd': '',
    'dateWorkStart': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
];
