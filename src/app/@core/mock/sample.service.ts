import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CavetService {
  constructor(private http: HttpClient) {}

  BASE_URL = '';

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  fetchCase(caseId: string): Observable<any> {
    let url = this.BASE_URL + `/vehicle_registration_composite/${caseId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
}
