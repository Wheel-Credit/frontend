import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../error/error-handler.service';
import { catchError, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  private baseUrl = environment.userApiUrl + 'client';

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return { headers };
  }

  getAuth() {
    return this.http
      .get(`${this.baseUrl}`, this.getHttpOptions())
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }

  getUserById() {
    const id = localStorage.getItem('id');
    return this.http
      .get(`${this.baseUrl}/${id}`, this.getHttpOptions())
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }
}
