export class PlanCommon {
  id: number;
  workType: string;
  service: string;
  houseGuid: string;
  companyId: string;
  dateAdd: string;

  constructor(id: number, workType: string, service: string, houseGuid: string, companyId: string, dateAdd: string) {
    this.id = id;
    this.workType = workType;
    this.service = service;
    this.houseGuid = houseGuid;
    this.companyId = companyId;
    this.dateAdd = dateAdd;
  }
}
