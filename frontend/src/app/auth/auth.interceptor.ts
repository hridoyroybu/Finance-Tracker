import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { APIService } from 'src/app/services/api-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: APIService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    console.log("INTERCEPTOR");

    const authReq = accessToken
      ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Try to refresh token
          return from(this.apiService.refreshToken()).pipe(
            switchMap((newToken: string) => {
              localStorage.setItem('access_token', newToken);
              const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
              return next.handle(retryReq);
            }),
            catchError(() => {
              this.apiService.logout();
              return throwError(() => new Error('Session expired. Please log in again.'));
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
