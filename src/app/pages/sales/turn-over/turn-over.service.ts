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


}