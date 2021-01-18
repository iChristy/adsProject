export class CitizenInfo {
  id: number;
  fioMain: string;
  fioContact: string;
  phone: string;
  email: string;
  houseGuid: string;
  address: string;
  flatGuid: string;
  flatNum: string;

  constructor(id: number, fioMain: string, fioContact: string, phone: string, email: string, houseGuid: string, address: string, flatGuid: string, flatNum: string) {
    this.id = id;
    this.fioMain = fioMain;
    this.fioContact = fioContact;
    this.phone = phone;
    this.email = email;
    this.houseGuid = houseGuid;
    this.address = address;
    this.flatGuid = flatGuid;
    this.flatNum = flatNum;
  }
}
