import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
catchError
@Injectable({
  providedIn: 'root'
})
export class OilConsumptionService {
  [x: string]: any;
  url = environment.base_url;
  // url1 = environment.base_url1;
  constructor(private http: HttpClient) { }

  findAll(data): Observable<any> {
    return this.http.post(this.url + '/', data).pipe(catchError(this.handleError));
  }


  
}
