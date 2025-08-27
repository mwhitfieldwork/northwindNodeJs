import { inject, Injectable } from '@angular/core';
import { OrderDetails, Orders } from '../../models/order-detail';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private _http = inject(HttpClient)
  url:string = 'http://localhost:3002/api/v1'
  errorMessage:any;
  
  constructor() { }

  
  get(): Observable<Orders> {
    return this._http.get<Orders>(`${this.url}/orders/history`)
    .pipe( 
      tap(items => {
        console.log(this.url)
      }),
      catchError(this.handleError),
    )
  }
    

  private handleError(error: Response) {
    console.error(error);
    return throwError(() => error || 'Server error');
  }
}
