import {UpdatesInterface} from '../interfaces/UpdatesInterface';

export class Updates implements UpdatesInterface{

  constructor(public code: number, public prefix: string, public update: Array<object>) {
    this.code = code;
    this.prefix = prefix;
    this.update = update;
  }
}
