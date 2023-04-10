import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthData } from '../data/auth';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';
import { tap, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private service: AuthData,
    private spinnerService: SpinnerService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    let tokenizedReq =
      this.service.getToken() != 'null' && this.service.getToken() != ''
        ? req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + this.service.getToken(),
              // clientMessageId: 'ald',
            },
          })
        : req;

    return next.handle(tokenizedReq).pipe(
      finalize(() => {
        this.spinnerService.hide();
      }),
      tap({
        next: (event) => this.spinnerService.hide(),
        error: (error) => {
          this.spinnerService.hide();
          let refreshToken = localStorage.getItem('refreshToken');
          if (error.status == 401 && refreshToken)
            this.handle401(tokenizedReq, next);
          else if (error.status == 401) {
            window.location.href = '/';
            this.authService.logout();
          }
        },
      })
    );
  }
  handle401(req: HttpRequest<any>, next: HttpHandler) {
    // this.message.warning('Phiên làm việc đã hết hạn. Vui lòng thử lại');
    localStorage.setItem('accessToken', '');
    this.authService.refreshToken().subscribe(
      (res) => {
        res = JSON.parse(res);
        localStorage.setItem('accessToken', res.access_token);
        localStorage.setItem('tokenType', res.token_type);
        localStorage.setItem('refreshToken', res.refresh_token);
        localStorage.setItem('expires_in', res.expires_in);
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + res.access_token,
          },
        });
        return next.handle(req);
      },
      (err) => {
        localStorage.setItem('refreshToken', ''); // clear old refresh token
        return throwError(err);
      }
    );
  }
}
