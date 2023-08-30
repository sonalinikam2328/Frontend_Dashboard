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

    branchList(): Observable<any> {
        return this.http.get(this.url + '/branchList').pipe(catchError(this.handleError));
    }

    financialYear(): Observable<any> {
        return this.http.get(this.url + '/financialYear').pipe(catchError(this.handleError));
    }

}
