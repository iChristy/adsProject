export class Sending {
  constructor(from: string, to: Array<string>, content: Array<string>, type: string, action: string, hash: string) {
    this.from = from;
    this.to = to;
    this.content = content;
    this.type = type;
    this.action = action;
    this.hash = hash;
  }

  from: string;
  to: Array<string>;
  content: any;
  type: string;
  action: string;
  hash?: string;
}
