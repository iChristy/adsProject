export class Updates {
  id: number;
  code: string;
  prefix: string;
  updateFields: Array<object>;

  constructor(id: number, code: string, prefix: string, updateFields: Array<object>) {
    this.id = id;
    this.code = code;
    this.prefix = prefix;
    this.updateFields = updateFields;
  }
}
