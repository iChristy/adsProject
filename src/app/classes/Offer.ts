export class Offer {
  houseGuid: string;
  employeeId: string;
  dateAdd: string;
  active: boolean;
  comment: string;


  constructor(houseGuid: string, employeeId: string, dateAdd: string, active: boolean, comment: string) {
    this.houseGuid = houseGuid;
    this.employeeId = employeeId;
    this.dateAdd = dateAdd;
    this.active = active;
    this.comment = comment;
  }
}
