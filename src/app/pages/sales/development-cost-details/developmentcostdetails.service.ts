import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
catchError

@Injectable({
  providedIn: 'root'
})
export class DevelopmentcostdetailsService {
  url = environment.base_url;
  constructor(private http: HttpClient) { }
  [x: string]: any;
  
  findAll(data): Observable<any> {
    return this.http.post(this.url + '/developmentcostdetails/DevelopmentcostdetailsData', data).pipe(catchError(this.handleError));
  }

  
}
