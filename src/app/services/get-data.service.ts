import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('main', '1')
    })
      .pipe(map((response: any) => response));
    //   .pipe(shareReplay());
  }

  getHousesList(): Observable<Houses[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('houses', '1').set('dop', 'PDCvH0p7BT')
    })
      .pipe(map((response: any) => response));
  }

  getFlatsList(companyId: string): Observable<Flats[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('companyId', 'usrCompany').set('flats', '1')
    })
      .pipe(map((response: any) => response));
  }

  getCitizenInfoList(companyId: string): Observable<CitizenInfo[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('companyId', 'usrCompany').set('citizenInfo', '1')
    })
      .pipe(map((response: any) => response));
  }

  getStatusList(): Observable<Status[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('status_', '1')
    })
      .pipe(map((response: any) => response));
  }

  getCurrentCompany(): Observable<Company[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('company', '1')
    })
      .pipe(map((response: any) => response));
  }

  getCurrentUser(): Observable<User[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest?', {
      params: new HttpParams().set('users', '1')
    })
      .pipe(map((response: any) => response));
  }

  getTypeList(): Observable<TypeWork[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('type', '1')
    })
      .pipe(map((response: any) => response));
  }

  getKindList(): Observable<KindWork[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('kind', '1')
    })
      .pipe(map((response: any) => response));
  }

  getContentList(): Observable<Content[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('content', '1')
    })
      .pipe(map((response: any) => response));
  }

  getDisconnections(companyId: string): Observable<Disconnection[]> {
    return this.http.get('http://localhost:8070/Request/ForRequest', {
      params: new HttpParams().set('disconnection', '1').set('companyId', 'usrCompany')
    })
      .pipe(map((response: any) => response));
  }
}
