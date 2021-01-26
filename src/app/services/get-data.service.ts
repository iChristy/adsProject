import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ZayavkaInterface} from '../interfaces/ZayavkaInterface';
import {Houses} from '../classes/Houses';
import {Status} from '../classes/Status';
import {Zayavka} from '../classes/Zayavka';
import {Company} from '../classes/Company';
import {User} from '../classes/User';
import {TypeWork} from '../classes/TypeWork';
import {KindWork} from '../classes/KindWork';
import {Content} from '../classes/Content';
import {Flats} from '../classes/Flats';
import {CitizenInfo} from '../classes/CitizenInfo';
import {Disconnection} from '../classes/Disconnection';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {
  }

  getZayavkiList(): Observable<ZayavkaInterface[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?main=1')
      .pipe(map((response: any) => response));
    //   .pipe(shareReplay());
  }

  getHousesList(): Observable<Houses[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?houses=1&dop=PDCvH0p7BT')
      .pipe(map((response: any) => response));
  }

  getFlatsList(house: string): Observable<Flats> {
    return this.http.get('http://localhost:8070/Request/ForRequest?flats=1&houses=' + house)
      .pipe(map((response: any) => response));
  }

  getCitizenInfoList(house: string): Observable<CitizenInfo> {
    return this.http.get('http://localhost:8070/Request/ForRequest?citizenInfo=1&houses=' + house)
      .pipe(map((response: any) => response));
  }

  getStatusList(): Observable<Status[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?status_=1')
      .pipe(map((response: any) => response));
  }

  getCurrentCompany(): Observable<Company[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?company=1')
      .pipe(map((response: any) => response));
  }

  getCurrentUser(): Observable<User[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?users=1')
      .pipe(map((response: any) => response));
  }

  getTypeList(): Observable<TypeWork[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?type=1')
      .pipe(map((response: any) => response));
  }

  getKindList(): Observable<KindWork[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?kind=1')
      .pipe(map((response: any) => response));
  }

  getContentList(): Observable<Content[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?content=1')
      .pipe(map((response: any) => response));
  }

  getDisconnections(companyId: string): Observable<Disconnection[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?disconnection=1&companyId=usrCompany')
      .pipe(map((response: any) => response));
  }
}
