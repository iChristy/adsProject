export class Offer {
  address: string;
  houseGuid: string;
  employeeId: string;
  date: string;
  active: boolean;
  comment: string;


  constructor(address: string, houseGuid: string, employeeId: string, date: string, active: boolean, comment: string) {
    this.address = address;
    this.houseGuid = houseGuid;
    this.employeeId = employeeId;
    this.date = date;
    this.active = active;
    this.comment = comment;
  }
}
