export class PlanService {
  id: number;
  workType: string;
  service: Array<string>;
  companyId: string;

  constructor(id: number, workType: string, service: Array<string>, companyId: string) {
    this.id = id;
    this.workType = workType;
    this.service = service;
    this.companyId = companyId;
  }
}
