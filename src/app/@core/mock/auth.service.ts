import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthData, ForgotPass, Login, Register, ResetPass } from '../data/auth';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService extends AuthData {
  roleAs: string;

  constructor(private http: HttpClient) {
    super();
  }

  BASE_URL = environment.BASE_URL_AUTH;

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.status);
  }

  getToken(): String {
    var token = '';
    if (localStorage.length != 0) {
      token = String(localStorage.getItem('accessToken'));
    }
    return token;
  }
  refreshToken(): Observable<any> {
    let url = this.BASE_URL + `/token`;
    let refreshToken = localStorage.getItem('refreshToken');
    let headers = new HttpHeaders();
    headers = headers
      .set('Authorization', 'Basic YXBwbHV1ZG9uZ3dlYjpaT2RqTTJWUW9raXloM2th')
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    return this.http.post(url, body.toString(), {
      headers: headers,
      responseType: 'text',
    });
  }

  login(data: Login): Observable<any> {
    let url = this.BASE_URL + `/token`;
    let headers = new HttpHeaders();
    headers = headers
      .set('Authorization', 'Basic YXBwbHV1ZG9uZ3dlYjpaT2RqTTJWUW9raXloM2th')
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', data.username)
      .set('password', data.password);
    return this.http
      .post(url, body.toString(), {
        headers: headers,
        responseType: 'text',
      })
      .catch(this.errorHandler);
  }

  userInfo(): Observable<any> {
    let url = this.BASE_URL + `/userinfo`;
    return this.http
      .get(url, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  forgotPass(data: ForgotPass): Observable<any> {
    let url = this.BASE_URL + ``;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  changePassword(
    username: string,
    password: string,
    newPassword: string
  ): Observable<any> {
    let url = this.BASE_URL + `/account/change-password`;
    let data = {
      username: username,
      password: password,
      newPassword: newPassword,
    };

    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }
  resetPass(data: ResetPass): Observable<any> {
    let url = this.BASE_URL + ``;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  register(data: Register): Observable<any> {
    let url = this.BASE_URL + ``;
    return this.http
      .post(url, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  logout(): Observable<any> {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('tokenType', '');
    localStorage.setItem('refreshToken', '');
    let url = this.BASE_URL + `/revoke`;
    return this.http.get(url).catch(this.errorHandler);
  }

  IsLoggedIn() {
    // Check whether the token is expired and return
    // true or false
    return localStorage.getItem('userId') != null;
  }

  getRole() {
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
  }

  HaveRoleAccess(expectedRole: any) {
    var role = localStorage.getItem('roles').split(',').map(String);

    // const expectedRole = route.data['expectedRole'];
    const hasExpectedRole = role.some((r) => expectedRole.includes(r));
    return hasExpectedRole;
  }
}
