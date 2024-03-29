import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../error/error-handler.service';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  private baseUrl = environment.userApiUrl + 'smartPayment';

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return { headers };
  }

  getPaymentByClientId(id: number) {
    return this.http
      .get(`${this.baseUrl}/${id}/list`, this.getHttpOptions())
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }

  postPayment(id: number, payment: any) {
    return this.http
      .post(`${this.baseUrl}/${id}/create`, payment, this.getHttpOptions())
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }

  putPayment(id: number, payment: any) {
    return this.http
      .put(`${this.baseUrl}/${id}/update`, payment, this.getHttpOptions())
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }

  deletePayment(id: number) {
    return this.http
      .delete(`${this.baseUrl}/${id}/delete`, this.getHttpOptions())
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }
}
