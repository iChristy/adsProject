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
  contents: Array<string>;
  time: string;
  comment: string;
  status: string;
  dateBegin: string;
  dateComplete: string;
  dateWorkOff: string;
  dateWorkOn: string;
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


}
