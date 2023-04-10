import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GroupData } from '../data/group';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GroupService extends GroupData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL_USER;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  fetchGroup(groupId: string): Observable<any> {
    let url = this.BASE_URL + `/group-composite/${groupId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchGroups(): Observable<any> {
    let url = this.BASE_URL + `/group`;
    return this.http.get(url).catch(this.errorHandler);
  }
  createGroup(group: object): Observable<any> {
    let url = this.BASE_URL + `/group-composite`;
    var data = group;
    return this.http
      .post(url, data, {
        responseType: 'text',
      })
      .catch(this.errorHandler);
  }
  editGroup(group: object): Observable<any> {
    let url = this.BASE_URL + `/group-composite`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(group);
    return this.http
      .put(url, body, { headers: headers })
      .catch(this.errorHandler);
  }
}
