import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient) {}

  BASE_URL = environment.BASE_URL_SECURE;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  getListCaseByUser(userId: string): Observable<any> {
    let url =
      this.BASE_URL + `/secure_transaction_composite/get_by_user_id/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  getCaseById(caseId: string): Observable<any> {
    let url = this.BASE_URL + `/secure_transaction_composite/${caseId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
}
