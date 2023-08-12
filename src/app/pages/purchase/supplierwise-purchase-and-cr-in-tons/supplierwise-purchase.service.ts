import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable,throwError } from 'rxjs';
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


  companylist(): Observable<any> {
    return this.http.get(this.url + '/companyList').pipe(catchError(this.handleError));
  }

  suppliCate(): Observable<any> {
    return this.http.get(this.url + '/dashboard/supplierCategory').pipe(catchError(this.handleError));
  }

  getCustomersLarge() {
    return this.http.get<any>('./data.json')
        .toPromise()
        .then(res => <Customer[]>res.data)
        .then(data => { return data; });
}
  
}
