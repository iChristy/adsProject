import {PlanCommon} from './PlanCommon';

export class PlanWorker extends PlanCommon{
  workerId: string;
  days?: Array<string>;
  dateWork?: string;
  interval?: Array<string>;


  constructor(id: number, workType: string, service: string, houseGuid: string, companyId: string, dateAdd: string,
              workerId: string, days: Array<string>, dateWork: string, interval: Array<string>) {
    super(id, workType, service, houseGuid, companyId, dateAdd);
    this.workerId = workerId;
    this.days = days;
    this.dateWork = dateWork;
    this.interval = interval;
  }
}
