import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from './customer'

@Injectable({
  providedIn: 'root'
})
export class TurnOverService {
  url = environment.base_url;
  constructor(private http: HttpClient) { }
  [x: string]: any;


  companylist(): Observable<any> {
    return this.http.get(this.url + '/companyList').pipe(catchError(this.handleError));
  }

  getCustomersLarge() {
    return this.http.get<any>('./data.json')
        .toPromise()
        .then(res => <Customer[]>res.data)
        .then(data => { return data; });
}


}