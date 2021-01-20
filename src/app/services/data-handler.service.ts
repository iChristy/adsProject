import {Injectable} from '@angular/core';
import {Zayavka} from '../classes/Zayavka';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {GetDataService} from './get-data.service';
import {Houses} from '../classes/Houses';
import {Status} from '../classes/Status';
import {filter, map} from 'rxjs/operators';
import {Company} from '../classes/Company';
import {User} from '../classes/User';
import {KindWork} from '../classes/KindWork';
import {TypeWork} from '../classes/TypeWork';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
import {Content} from '../classes/Content';
import {Flats} from '../classes/Flats';
import {CitizenInfo} from '../classes/CitizenInfo';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  zayavkiList: Zayavka[];
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
  contents: Content[];
  flatsList: Flats[];
  citizenInfoList: CitizenInfo[];


  constructor(private getDataService: GetDataService) {
  }


  //  Заявки / юзеры

  getHttpZayavkiData() {
    this.getDataService.getCurrentUser()
      .subscribe(
        user => {
          console.log(user);
          let currentUser = user.find(data => data.id === 'PDCvH0p7BT');
          this.workers.next(user.filter(data => data.companyId === currentUser?.companyId && data.role === 'worker'));
          this.masters.next(user.filter(data => data.companyId === currentUser?.companyId && data.role === 'master'));
          this.dispatchers.next(user.filter(data => data.companyId === currentUser?.companyId && data.role === 'dispatcher'));
          this.dispatchersMasters.next(user.filter(data => data.companyId === currentUser?.companyId && data.role === 'dispatcherMaster'));

          if (currentUser) {

            this.currentUser.next(currentUser);

            this.getDataService.getCurrentCompany()
              .pipe(
                map(data => data.filter(data => data.companyId === currentUser?.companyId)
                )).subscribe(
              company => {
                return this.getDataService.getZayavkiList().pipe(
                  map(data => data.filter(data => data.companyId === company[0].companyId)
                  )).subscribe(
                  zayavki => {
                    this.zayavkiList = zayavki;
                    this.zayavkiSubject.next(this.zayavkiList);
                  }
                );
              }
            );
          }
        }
      );
  }

  setCurrentZayavka(zayavka: Zayavka) {
    return this.currentZayavka.next(zayavka);
  }

  updateZayavka(code: number, prefix: string, updateFilds: object) {
    // @ts-ignore
    let findZayavka: Zayavka = this.zayavkiList.find(zayavki => zayavki.prefix === prefix && zayavki.code === code);
    let ind = this.zayavkiList.indexOf(findZayavka);
    Object.keys(updateFilds).forEach(keyUpdates =>
      Object.keys(findZayavka).forEach(key => key === keyUpdates ? Object(findZayavka)[key] === Object(updateFilds)[key] : '')
    );
    console.log(this.zayavkiList);
    this.zayavkiList.splice(ind, 1, findZayavka);
    this.zayavkiSubject.next(this.zayavkiList);
  }

  getHttpZayavki() {
    return this.getDataService.getZayavkiList().pipe(
      map(data => data.filter(data => data.companyId)
      )).subscribe(
      zayavki => {
        this.zayavkiList = zayavki;
        this.zayavkiSubject.next(this.zayavkiList);
      }
    );
  }

  formatOfDateString(dateString: string) {
    let date = moment(dateString, 'DD-MM-YYYY HH:mm').toDate();
    return formatDate(new Date(date), 'dd-MM-yyyy HH:mm', 'en-GB');
  }

  formatOfDate() {
    return formatDate(new Date(), 'dd-MM-yyyy HH:mm', 'en-GB');
  }

  addNewZayavka(zayavka: Zayavka) {
    let listPrefix = this.zayavkiList.filter(z => z.prefix == this.currentUser.getValue().ownPrefix);
    let idZayavaka = Math.max.apply(Math, listPrefix.map(list => list.code)) + 1;
    zayavka.code = idZayavaka;
    // @ts-ignore
    zayavka.prefix = this.currentUser.getValue().ownPrefix;
    zayavka.dateBegin = this.formatOfDateString(formatDate(new Date(), 'dd-MM-yyyy HH:mm', 'en-GB'));
    zayavka.status = zayavka.workerId ? 'назначено' : 'принято';
    let momentDate = moment(zayavka.dateBegin, 'DD-MM-YYYY HH:mm').toDate();
    momentDate.setHours(momentDate.getHours() + parseInt(zayavka.time));
    zayavka.dateDeadline = formatDate(momentDate.toString(), 'dd-MM-yyyy HH:mm', 'en-US', '+0500');
    // @ts-ignore
    zayavka.address = this.housesList.getValue().find( house => house.houseGuid === zayavka.houseGuid).address;
    this.zayavkiList.push(zayavka);
    console.log(this.zayavkiList);
    this.zayavkiSubject.next(this.zayavkiList);
  }

  getZayavka() {
    return ZayavkaNew;
  }

  // Дома

  getHousesList() {
    this.flatsList = [];
    this.citizenInfoList = [];
    this.getDataService.getHousesList().subscribe(
      houses => {
        this.housesList.next(houses);
        this.getFlatsList(houses);
        console.log(this.housesList);
        houses.forEach(
          house => {
            console.log(house);
            this.getDataService.getFlatsList(house.houseGuid).subscribe(
              flat => this.flatsList.push(flat)
            );
            this.getDataService.getCitizenInfoList(house.houseGuid).subscribe(
              info => this.citizenInfoList.push(info)
            );
          }
        );
      }
    );
  }

  // Квартира

  getFlatsList(housesList: Houses[]) {
    // this.flatsList = [];
    // this.citizenInfoList = [];
    // housesList.forEach(
    //   house => {
    //     console.log(house);
    //     this.getDataService.getFlatsList(house.houseGuid).subscribe(
    //       flat => this.flatsList.push(flat)
    //     );
    //     this.getDataService.getCitizenInfoList(house.houseGuid).subscribe(
    //           info => this.citizenInfoList.push(info)
    //     );
    //
    //   }
    // );
  }

  // Статус

  getStatusList() {
    this.getDataService.getStatusList().subscribe(
      status => {
        this.statusList.next(status);
        console.log(status);
      }
    );
  }

  // Тип

  getTypeList() {
    this.getDataService.getTypeList().subscribe(
      types => {
        this.typeList.next(types);
        console.log(types);
      }
    );
  }

  // Вид

  getKindList() {
    this.getDataService.getKindList().subscribe(
      kinds => {
        this.kindList.next(kinds);
        console.log(kinds);
      }
    );
  }

  // Контенты

  getHttpContent() {
    this.getDataService.getContentList().subscribe(
      content => {
        this.contents = content;
      }
    );
  }

  getContentList(type: string, kind: string) {
    console.log(this.contents);
    if (kind === 'Платная') {
      return this.contents.filter(content => content.typeWork === type && content.price);
    } else {
      return this.contents.filter(content => content.typeWork === type && content.time);
    }
    return;
  }

  contentFilter(name: string) {

  }

  // Компания

  getCurrentCompany(user: any): string {
    this.getDataService.getCurrentCompany()
      .pipe(
        map(data => data.filter(data => data.companyId === user[0].companyId)
        )).subscribe(
      company => {
        return company.toString();
      }
    );
    return '';
  }

  // Юзер

  getCurrentUser(): any {
    // this.getDataService.getCurrentUser()
    //   .pipe(
    //     map(data => data.filter(data => data.id === 'PDCvH0p7BT')
    //     )).subscribe(
    //   user => {
    //     this.currentUser.next(user);
    //     return user;
    //   }
    // );
  }


  // Фильтр

  filters(text?: string, houseGuid?: string, status?: string, type?: string, kind?: string) {
    console.log(`${text} - ${houseGuid} - ${status} - ${type} - ${kind}`);
    let filterZayavki = this.zayavkiList;
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
}


const ZayavkaNew: Zayavka =
  {
    'code': 6,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  };

const ZayavkiTest: Zayavka[] = [
  {
    'code': 6,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 7,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 8,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 9,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 10,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 11,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 12,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 13,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 14,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
  {
    'code': 15,
    'contents': [
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
    'dateWorkOff': '',
    'dateWorkOn': '18-10-2019  14:46',
    'companyId': 'usrCompany'
  },
];
