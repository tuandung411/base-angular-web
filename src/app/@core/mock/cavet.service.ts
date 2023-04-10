import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CavetService {
  constructor(private http: HttpClient) {}

  BASE_URL = environment.BASE_URL_VEHICLE;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
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
      `/vehicle_registration_composite/get_all_registration_by_branch?branchCode=${branchCode}&keyword=${keyword}&type=${type}&page=${page}&size=${size}&orderby=${orderby}&sort=${sort}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchCase(caseId: string): Observable<any> {
    let url = this.BASE_URL + `/vehicle_registration_composite/${caseId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchBranchByBranchId(branchId: string): Observable<any> {
    let url =
      this.BASE_URL + `/vehicle_registration_composite/get_branch/${branchId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  createCase(data: object): Observable<any> {
    let url = this.BASE_URL + `/vehicle_registration_composite`;
    return this.http.post(url, data).catch(this.errorHandler);
  }

  updateCase(data: object): Observable<any> {
    let url = this.BASE_URL + `/vehicle_registration_composite`;
    return this.http.put(url, data).catch(this.errorHandler);
  }

  deleteCase(idCase: string): Observable<any> {
    let url = this.BASE_URL + `/vehicle_registration_composite/${idCase}`;
    return this.http.delete(url).catch(this.errorHandler);
  }

  createNote(note: object): Observable<any> {
    let url = this.BASE_URL + `/vehicle_registration_composite/create_note`;
    return this.http.post(url, note).catch(this.errorHandler);
  }

  fetchBranchesByProvince(provinceId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_branch_by_province_id/${provinceId}`;
    return this.http.get(url).catch(this.errorHandler);
  }
  fetchListAssetSendSafes(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_all_sendsafes/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchAwaitListSendSafes(userId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_list_send_safes/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchLocationCavetByUser(userId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_location_vehicle_registration/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  getBranchByBranchId(branchId: string): Observable<any> {
    let url =
      this.BASE_URL + `/vehicle_registration_composite/get_branch/${branchId}`;
    return this.http.get(url).catch(this.errorHandler);
  }
  getLocationRegistrationByProvince(provinceId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_location_registration_by_province/${provinceId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  getLocationById(id: string): Observable<any> {
    let url =
      this.BASE_URL + `/vehicle_registration_composite/get_branch/${id}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchConfirmedSendSafes(userId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_all_sendsafes/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  confirmAssignSendSafes(data: any): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/confirm_assign_sendsafes`;
    return this.http.put(url, data).catch(this.errorHandler);
  }
  fetchDetailSendSafes(idCase: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_full_detail_safe?notarizationId=${idCase}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
}
