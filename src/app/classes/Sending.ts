import {Zayavka} from './Zayavka';
import {Updates} from './Updates';

export class Sending {
  constructor(public from: string, public to: Array<string>, public content: any , public type: string, public action: string, public hash?: string) {
    this.from = from;
    this.to = to;
    this.content = content;
    this.type = type;
    this.action = action;
    this.hash = hash;
  }
}
