import {UserOldInterface} from '../interfaces/user-old-interface';
import {User} from './User';

export class UserOld implements UserOldInterface {

  constructor(public char: string, public company: string, public companyIDsocket: string, public id: string,
              public master: string, public name: string, public role: string, public type: string, public houses: Array<string>) {
    this.char = char;
    this.company = company;
    this.companyIDsocket = companyIDsocket;
    this.id = id;
    this.master = master;
    this.name = name;
    this.role = role;
    this.type = type;
    this.houses = houses;
  }

  setDataNewField(data: User) {
    data.id = this.id;
    data.name = this.name;
    data.ownPrefix = this.char;
    data.companyId = this.company;
    data.houses = this.houses;
    data.role = this.role;
    data.typeWork = this.type;
    data.masterLeader = this.master;
    data.companyIdSocket = this.companyIDsocket;
  }
}
