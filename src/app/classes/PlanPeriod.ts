import {PlanCommon} from './PlanCommon';

export class PlanPeriod extends PlanCommon{
  typePeriod: string;
  days?: Array<string>;
  interval?: Array<string>;
  seasons?: Array<string>;
  count?: number;
  dateWork?: string;
  comment?: string;

  constructor(id: number, workType: string, service: string, houseGuid: string, companyId: string, dateAdd: string, typePeriod: string, days: Array<string>, interval: Array<string>, seasons: Array<string>, count: number, dateWork: string, comment: string) {
    super(id, workType, service, houseGuid, companyId, dateAdd);
    this.typePeriod = typePeriod;
    this.days = days;
    this.interval = interval;
    this.seasons = seasons;
    this.count = count;
    this.dateWork = dateWork;
    this.comment = comment;
  }
}
