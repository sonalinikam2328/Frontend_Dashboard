import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Customer } from '../../sales/turn-over/customer';
import Swal from 'sweetalert2';
catchError


@Injectable({
  providedIn: 'root'
})
export class PurchaseTonnageService {
  url = environment.base_url;
  constructor(private http: HttpClient) { }
  [x: string]: any;

  suppliCate(data): Observable<any> {
    return this.http.post(this.url + '/purchasetonnage/supplierCategory', data).pipe(catchError(this.handleError));
  }

  supplier(data): Observable<any> {
    return this.http.post(this.url + '/purchasetonnage/supplier', data).pipe(catchError(this.handleError));
  }

  findAll(data): Observable<any> {
    return this.http.post(this.url + '/purchasetonnage/tonnage', data).pipe(catchError(this.handleError));
  }
  // 

}
