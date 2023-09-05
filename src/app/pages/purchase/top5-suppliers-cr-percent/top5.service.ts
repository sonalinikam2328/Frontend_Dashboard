import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../../sales/turn-over/customer';
import Swal from 'sweetalert2';
catchError
@Injectable({
  providedIn: 'root'
})
export class Top5Service {
  [x: string]: any;
  url = environment.base_url;
  // url1 = environment.base_url1;
  constructor(private http: HttpClient) { }

  findAll(data): Observable<any> {
    return this.http.post(this.url + '/top5supplier/top5supplierData', data).pipe(catchError(this.handleError));
  }



}