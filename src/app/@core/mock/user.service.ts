import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, UserCreate, UserData, UserEdit } from '../data/user';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService extends UserData {
  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL_USER;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  fetchUser(userId: string): Observable<any> {
    let url = this.BASE_URL + `/user-composite/${userId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchCurrentUserByGroupId(groupId: string): Observable<any> {
    let url = this.BASE_URL + `/user-composite/get_user_by_group/${groupId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchUsers(): Observable<any> {
    let url = this.BASE_URL + `/user-composite/`;
    return this.http.get(url).catch(this.errorHandler);
  }
  fetchCustomers(): Observable<any> {
    let url = this.BASE_URL + `/user-composite/get_customer`;
    return this.http.get(url).catch(this.errorHandler);
  }
  fetchCustomerByCustomerId(customerId: string): Observable<any> {
    let url = this.BASE_URL + `/user-composite/get_customer`;
    return this.http
      .get(url, {
        params: { customerId: customerId, clientMessageId: 'admin' },
      })
      .catch(this.errorHandler);
  }
  fetchStaticUserByByBranchCode(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/user-composite/get_static_user_by_branch_code/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchUserByBranchCode(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL + `/user-composite/get_user_by_branch/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchDataProvince(): Observable<any> {
    let url = 'assets/province.json';
    return this.http.get(url).catch(this.errorHandler);
  }
  fetchGroupByBranch(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL + `/user-composite/get_group_by_branch/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchGroupNotarizeByBranch(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/user-composite/get_group_notarize_by_branch/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchGroupSecureByBranch(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/user-composite/get_group_secure_by_branch/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  fetchGroupVehicleByBranch(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/user-composite/get_group_vehicle_by_branch/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  updateUserRole(userId: string, roleIds: string): Observable<any> {
    let url = this.BASE_URL + `/user-composite/update_user_role`;
    var data = { userId: userId, roleIds: roleIds };
    return this.http.put(url, data).catch(this.errorHandler);
  }
  updateUserGroup(userId: string, groupIds: string): Observable<any> {
    let url = this.BASE_URL + `/user-composite/update_user_group`;
    var data = { userId: userId, groupIds: groupIds };

    return this.http.put(url, data).catch(this.errorHandler);
  }

  updateRoleGroup(groupId: string, roleIds: string): Observable<any> {
    let url = this.BASE_URL + `/user-composite/update_role_group`;
    var data = { groupId: groupId, roleIds: roleIds };
    return this.http
      .put(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  deleteUser(userId: string): Observable<any> {
    let url = this.BASE_URL + `/user-composite/${userId}`;

    return this.http.delete(url).catch(this.errorHandler);
  }

  getGroupByBranch(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL + `/user-composite/get_group_by_branch/${branchCode}`;

    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  getAllRole(): Observable<any> {
    let url = this.BASE_URL + `/role-composite/get-all`;

    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  getRole(roleId: string): Observable<any> {
    let url = this.BASE_URL + `/role-composite/${roleId}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  fetchStaffByBranchCode(branchCode: string): Observable<any> {
    let url =
      this.BASE_URL +
      `/user-composite/get_secure_transaction_user_by_branch/${branchCode}`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  createUser(data: Object): Observable<any> {
    let url = this.BASE_URL + `/user-composite/`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .post(url, body, { headers: headers })
      .catch(this.errorHandler);
  }

  editUser(data: object): Observable<any> {
    let url = this.BASE_URL + `/user-composite/`;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http
      .put(url, body, { headers: headers })
      .catch(this.errorHandler);
  }
}
