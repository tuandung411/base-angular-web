import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SecureTransactionCompositeData } from '../data/secure-transaction-composite';

@Injectable({ providedIn: 'root' })
export class SecureTransactionCompositeService extends SecureTransactionCompositeData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL_SECURE;
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  fetchCase(caseId: string): Observable<any> {
    let url = this.BASE_URL + `/secure_transaction_composite/${caseId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchListSecureOnlineByBranch(
    branchCode: string,
    keyword: string,
    type: number,
    page: number,
    size: number,
    orderby: string,
    sort: string
  ): Observable<any> {
    let url =
      this.BASE_URL +
      `/secure_transaction_composite/get_all_secure_transaction_online_by_branch?branchCode=${branchCode}&keyword=${keyword}&type=${type}&page=${page}&size=${size}&orderby=${orderby}&sort=${sort}`;
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
  fetchListFinishByUserId(userId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/secure_transaction_composite/get_list_finish_assign/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchListCaseSecureOnlineByBranch(
    branchCode: string,
    keyword: string,
    type: number,
    page: number,
    size: number,
    orderby: string,
    sort: string
  ): Observable<any> {
    let url =
      this.BASE_URL +
      `/secure_transaction_composite/get_all_secure_transaction_online_by_branch?branchCode=${branchCode}&keyword=${keyword}&type=${type}&page=${page}&size=${size}&orderby=${orderby}&sort=${sort}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  confirmFinishAssign(
    notarizationId: string,
    isConfirm: boolean = true,
    description: string = ''
  ): Observable<any> {
    let data = {
      id: notarizationId,
      isConfirm: isConfirm,
      description: description,
    };
    let url =
      this.BASE_URL + `/secure_transaction_composite/confirm_finish_assign`;
    return this.http.put(url, data).catch(this.errorHandler);
  }
  createOnlineRpa(secure: object): Observable<any> {
    let url = this.BASE_URL + `/secure_transaction_composite/create_online_rpa`;
    return this.http.post(url, secure).catch(this.errorHandler);
  }
  confirmAssignSendSafes(data: any): Observable<any> {
    let url =
      this.BASE_URL + `/secure_transaction_composite/confirm_assign_sendsafes`;
    return this.http.put(url, data).catch(this.errorHandler);
  }
  confirmReturnSafes(targetUserId: string, assetId: any): Observable<any> {
    const data = { targetUserId: targetUserId, assetId: assetId };
    let url = this.BASE_URL + `/secure_transaction_composite/remove_safes`;

    return this.http.put(url, data).catch(this.errorHandler);
  }
  fetchAwaitListSendSafes(userId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/secure_transaction_composite/get_list_send_safes/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchListAssetSendSafes(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/secure_transaction_composite/get_all_sendsafes/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchConfirmedSendSafes(userId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/secure_transaction_composite/get_all_sendsafes/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchDetailSendSafes(idCase: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/secure_transaction_composite/get_full_detail_safe?notarizationId=${idCase}`;

    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchListCaseByBranch(
    branchCode: string,
    keyword: string,
    type: number,
    page: number,
    size: number,
    orderby: string,
    sort: string
  ): Observable<any> {
    let url =
      this.BASE_URL +
      `/secure_transaction_composite/get_all_secure_transaction_by_branch?branchCode=${branchCode}&keyword=${keyword}&type=${type}&page=${page}&size=${size}&orderby=${orderby}&sort=${sort}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchBranchByBranchId(branchId: string): Observable<any> {
    let url =
      this.BASE_URL + `/secure_transaction_composite/get_branch/${branchId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
}
