export class EditHistory {
  id: number;
  code: string;
  prefix: string;
  history: object;

  constructor(id: number, code: string, prefix: string, history: object) {
    this.id = id;
    this.code = code;
    this.prefix = prefix;
    this.history = history;
  }

}
