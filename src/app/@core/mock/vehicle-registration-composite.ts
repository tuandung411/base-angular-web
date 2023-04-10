import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleRegistrationCompositeData } from '../data/vehicle-registration-composite';

@Injectable({ providedIn: 'root' })
export class VehicleRegistrationCompositeService extends VehicleRegistrationCompositeData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL_VEHICLE;
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  fetchCase(caseId: string): Observable<any> {
    let url = this.BASE_URL + `/vehicle_registration_composite/${caseId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchListFinishByUserId(userId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_list_finish_assign/${userId}`;
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
      this.BASE_URL + `/vehicle_registration_composite/confirm_finish_assign`;
    return this.http.put(url, data).catch(this.errorHandler);
  }
  confirmAssignSendSafes(idCase: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/confirm_assign_sendsafes?vehicleRegistrationId=${idCase}`;
    return this.http.put(url, null).catch(this.errorHandler);
  }
  confirmReturnSafes(targetUserId: string, assetId: any): Observable<any> {
    const data = { targetUserId: targetUserId, assetId: assetId };
    let url = this.BASE_URL + `/vehicle_registration_composite/remove_safes`;

    return this.http.put(url, data).catch(this.errorHandler);
  }
  fetchAwaitListSendSafes(userId: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_list_send_safes/${userId}`;
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
  fetchDetailSendSafes(idCase: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/vehicle_registration_composite/get_detail_sendsafes/${idCase}`;
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
}
