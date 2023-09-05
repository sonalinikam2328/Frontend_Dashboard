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
export class SupplierwisePurchaseService {
  url = environment.base_url;
  constructor(private http: HttpClient) { }
  [x: string]: any;

  findAll(data): Observable<any> {
    return this.http.post(this.url + '/supplierwisepurchasecrintons/getsupplierwisepurchasecrintonsData', data).pipe(catchError(this.handleError));
  }
  // 

}
