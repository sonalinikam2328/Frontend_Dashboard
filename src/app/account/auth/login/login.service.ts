import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    url = environment.base_url;
    constructor(private http: HttpClient) { }
    [x: string]: any;


    companylist(data): Observable<any> {
        return this.http.get(this.url + '/companyList/' + data).pipe(catchError(this.handleError));
    }


    loginData(data): Observable<any> {
        return this.http.post(this.url + '/login', data).pipe(catchError(this.handleError));
    }

    loginData1(data): Observable<any> {
        return this.http.post(this.url + '/login1', data).pipe(catchError(this.handleError));
    }




}