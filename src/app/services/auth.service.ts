import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { UserModule } from '../model/user.model';
import { AuthModule } from '../model/auth.model';
import { catchError, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  private baseUrl = environment.userApiUrl + 'auth/';

  login(item: any): Observable<AuthModule> {
    return this.http
      .post<AuthModule>(`${this.baseUrl}login`, item)
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }

  signup(item: any): Observable<UserModule> {
    return this.http
      .post<UserModule>(
        `${this.baseUrl}signup`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }
}
