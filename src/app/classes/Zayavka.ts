import {ZayavkaInterface} from '../interfaces/ZayavkaInterface';

export class Zayavka implements ZayavkaInterface {

  code: number;
  prefix: string;
  fioOwner: string;
  fioSecondary: string;
  phone: string;
  email: string;
  houseGuid: string;
  address: string;
  flatGuid: string;
  flatNum: string;
  kindWork: string;
  typeWork: string;
  services: Array<string>;
  time: string;
  comment: string;
  status: string;
  dateBegin: string;
  dateComplete: string;
  dateWorkEnd: string;
  dateWorkStart: string;
  dateDeadline: string;
  dispatcherId: string;
  masterId: string;
  workerId: string;
  picId: number;
  materials: string;
  actions: string;
  cancelReason: string;
  companyId: string;
  price: string;

  constructor() {}
  // constructor(data : any) {
  //   this.code = data.code;
  //   this.prefix = data.prefix;
  //   this.fioOwner = data.fioOwner;
  //   this.fioSecondary = data.fioSecondary;
  //   this.phone = data.phone;
  //   this.email = data.email;
  //   this.houseGuid = data.houseGuid;
  //   this.address = data.address;
  //   this.flatGuid = data.flatGuid;
  //   this.flatNum = data.flatNum;
  //   this.kindWork = data.kindWork;
  //   this.typeWork = data.typeWork;
  //   this.contents = data.contents;
  //   this.time = data.time;
  //   this.comment = data.comment;
  //   this.status = data.status;
  //   this.dateBegin = data.dateBegin;
  //   this.dateComplete = data.dateComplete;
  //   this.dateWorkOff = data.dateWorkOff;
  //   this.dateWorkOn = data.dateWorkOn;
  //   this.dateDeadline = data.dateDeadline;
  //   this.dispatcherId = data.dispatcherId;
  //   this.masterId = data.masterId;
  //   this.workerId = data.workerId;
  //   this.picId = data.picId;
  //   this.materials = data.materials;
  //   this.actions = data.actions;
  //   this.cancelReason = data.cancelReason;
  //   this.companyId = data.companyId;
  //   this.price = data.price;
  // }
}
