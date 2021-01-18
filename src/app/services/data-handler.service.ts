import {Injectable} from '@angular/core';
import {Zayavka} from '../interfaces/Zayavka';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {GetDataService} from './get-data.service';
import {Houses} from '../classes/Houses';
import {Status} from '../classes/Status';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  zayavkiList: Zayavka[];
  housesList = new BehaviorSubject<Houses[]>([]);
  statusList = new BehaviorSubject<Status[]>([]);
  zayavkiSubject = new BehaviorSubject<Zayavka[]>([]);

  constructor(private getDataService: GetDataService) {
  }


  //  Заявки

  getHttpZayavki() {
    return this.getDataService.getZayavkiList().subscribe(
      zayavki => {
        this.zayavkiList = zayavki;
        this.zayavkiSubject.next(this.zayavkiList);
      }
    );
  }

  setZayavka() {
    this.zayavkiList.push(ZayavkaNew);
    this.zayavkiSubject.next(this.zayavkiList);
  }

  getZayavka() {
    return ZayavkaNew;
  }

  // Дома

  getHousesList() {
    this.getDataService.getHousesList().subscribe(
      houses => {
        this.housesList.next(houses);
        console.log(this.housesList);
      }
    );
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


  // Фильтр

  filters(text?: string, houseGuid?: string, status?: string, kind?: string) {

    let filterZayavki = this.zayavkiList;
    if (text !== undefined && text !== '') {
      filterZayavki = filterZayavki.filter(zayavka => zayavka.address.toUpperCase().includes(<string> text?.toUpperCase()));
    }
    // if (kind !== null) {
    //   filterZayavki = filterZayavki.filter(z => z.kindWork === kind);
    // }
    if (status !== null && status !== undefined) {
      filterZayavki = filterZayavki.filter(z => z.status === status);
    }

    if (houseGuid !== undefined && houseGuid !== '') {
      console.log('v domah');
      filterZayavki = filterZayavki.filter(z => z.houseGuid === houseGuid);
    }
    // filterZayavki = filterZayavki.filter(z => z.status === 'принято');
    // filterZayavki = filterZayavki.filter(z => z.kindWork === 'Аварийная');
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
