import {PlanCommon} from './PlanCommon';

export class PlanComplete extends PlanCommon{
  workerId: string;
  comment: string;


  constructor(id: number, workType: string, service: string, houseGuid: string,
              companyId: string, dateAdd: string, workerId: string, comment: string) {
    super(id, workType, service, houseGuid, companyId, dateAdd);
    this.workerId = workerId;
    this.comment = comment;
  }
}
