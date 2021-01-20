export class CitizenInfo {
  id: number;
  fioOwner?: string;
  fioSecondary?: string;
  phone: string;
  email: string;
  houseGuid: string;
  flatGuid?: string;
  flatNum: string;

  constructor(id: number, fioOwner: string, fioSecondary: string, phone: string, email: string, houseGuid: string, flatGuid: string, flatNum: string) {
    this.id = id;
    this.fioOwner = fioOwner;
    this.fioSecondary = fioSecondary;
    this.phone = phone;
    this.email = email;
    this.houseGuid = houseGuid;
    this.flatGuid = flatGuid;
    this.flatNum = flatNum;
  }
}
