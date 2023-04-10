import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { NotarizeCompositeData } from '../data/notarize-composite';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NotarizeCompositeService extends NotarizeCompositeData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL_NOTARIZE;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }
  errorHandler_2(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  fetchCase(caseId: string): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/${caseId}`;
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
      `/notarize_composite/get_all_notarize_by_branch?branchCode=${branchCode}&keyword=${keyword}&type=${type}&page=${page}&size=${size}&orderby=${orderby}&sort=${sort}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchListFinishByUserId(userId: string): Observable<any> {
    let url =
      this.BASE_URL + `/notarize_composite/get_list_finish_assign/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchBranchByBranchId(branchId: string): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/get_branch/${branchId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchAccessType(): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/get_asset_type`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  createNotarize(notarize: object): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite`;
    return this.http.post(url, notarize).catch(this.errorHandler_2);
  }

  updateNotarize(notarize: object): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite`;
    return this.http.put(url, notarize).catch(this.errorHandler_2);
  }

  deleteCase(idCase: string): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/${idCase}`;
    return this.http.delete(url).catch(this.errorHandler);
  }

  createNote(note: object): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/create_note`;
    return this.http.post(url, note).catch(this.errorHandler);
  }
  fetchProvinces(): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/get_all_province`;
    return this.http.get(url).catch(this.errorHandler);
  }

  fetchBranchesByProvince(provinceId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/notarize_composite/get_all_branch_by_province_id/${provinceId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchBranchesOfSameHubByBranch(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/notarize_composite/get_list_branch_hub?branchCode=${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  // fetchDetailDocumentSendSafes(branchCode: string): Observable<any> {
  //   let url =
  //     this.BASE_URL +
  //     `/notarize_composite/get_list_branch_hub?branchCode=${branchCode}`;
  //   return this.http
  //     .get(url, { responseType: 'text' })
  //     .catch(this.errorHandler);
  // }

  fetchLocationNotarization(userId: string): Observable<any> {
    let url =
      this.BASE_URL + `/notarize_composite/get_location_notarization/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchLocationNotarizationByProvince(provinceId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/notarize_composite/get_location_notarization_by_province/${provinceId}`;
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

    let url = this.BASE_URL + `/notarize_composite/confirm_finish_assign`;
    return this.http.put(url, data).catch(this.errorHandler);
  }

  confirmAssignSendSafes(data: any): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/confirm_assign_sendsafes`;
    return this.http.put(url, data).catch(this.errorHandler);
  }
  confirmReturnSafes(targetUserId: string, assetId: any): Observable<any> {
    const data = { targetUserId: targetUserId, assetId: assetId };
    let url = this.BASE_URL + `/notarize_composite/remove_safes`;

    return this.http.put(url, data).catch(this.errorHandler);
  }
  fetchAwaitListSendSafes(userId: string): Observable<any> {
    let url =
      this.BASE_URL + `/notarize_composite/get_list_send_safes/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchDocumentSendSafes(assetId: string): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/get_detail_in_safes`;
    const body = { assetId: assetId };
    return this.http
      .get(url, { responseType: 'text', params: body })
      .catch(this.errorHandler);
  }

  fetchConfirmedSendSafes(userId: string): Observable<any> {
    let url = this.BASE_URL + `/notarize_composite/get_all_sendsafes/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchListAssetSendSafes(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL + `/notarize_composite/get_all_sendsafes/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchDetailSendSafes(idCase: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/notarize_composite/get_full_detail_safe?notarizationId=${idCase}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
}
