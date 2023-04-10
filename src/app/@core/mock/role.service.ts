import { Injectable } from '@angular/core';
import { Role, RoleCreate, RoleData } from '../data/role';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService extends RoleData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL_USER;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  fetchRole(id: string): Observable<any> {
    let url = this.BASE_URL + `/role/${id}`;
    return this.http.get(url).catch(this.errorHandler);
  }

  fetchRoles(): Observable<any> {
    let url = this.BASE_URL + `/role`;
    return this.http.get(url).catch(this.errorHandler);
  }

  createRole(data: RoleCreate): Observable<any> {
    let url = this.BASE_URL + `/role`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .post(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  editRole(data: Object): Observable<any> {
    let url = this.BASE_URL + `/role-composite`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .put(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  deleteRole(id: string): Observable<any> {
    let url = this.BASE_URL + `/role/${id}`;
    return this.http.delete(url).catch(this.errorHandler);
  }
}
