import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppComponentService {
    url = environment.base_url;
    constructor(private http: HttpClient) { }
    [x: string]: any;

    branchList(data): Observable<any> {
        return this.http.post(this.url + '/branchList', data).pipe(catchError(this.handleError));
    }

    financialYear(data): Observable<any> {
        return this.http.post(this.url + '/financialYear', data).pipe(catchError(this.handleError));
    }

    month(data): Observable<any> {
        return this.http.post(this.url + '/month', data).pipe(catchError(this.handleError));
    }

    findAll(data): Observable<any> {
        return this.http.post(this.url + '/comman', data).pipe(catchError(this.handleError));
    }

}
