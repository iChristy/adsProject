export class Disconnect {
  id: number;
  comment: string;
  address: string;
  houseGuid: string;
  interval: Array<number>;
  typeWork: string;


  constructor(id: number, comment: string, address: string, houseGuid: string, interval: Array<number>, typeWork: string) {
    this.id = id;
    this.comment = comment;
    this.address = address;
    this.houseGuid = houseGuid;
    this.interval = interval;
    this.typeWork = typeWork;
  }
}
