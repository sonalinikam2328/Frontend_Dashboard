import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnquiryRegisterService {
  url = environment.base_url;
  constructor(private http: HttpClient) { }
  [x: string]: any;

  findAll(data): Observable<any> {
    return this.http.post(this.url + '/paymentcollectionplan/paymentcollectionplanData/', data).pipe(catchError(this.handleError));
  }



}