export class Disconnection {
  id: number;
  comment: string;
  houseGuid: string;
  interval: Array<string>;
  typeWork: string;
  initiator: string;
  address?: string;

  constructor(id: number, comment: string, houseGuid: string, interval: Array<string>, typeWork: string, initiator: string, address: string) {
    this.id = id;
    this.comment = comment;
    this.houseGuid = houseGuid;
    this.interval = interval;
    this.typeWork = typeWork;
    this.initiator = initiator;
    this.address = address;
  }
}
