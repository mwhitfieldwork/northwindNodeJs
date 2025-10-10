import { inject, Injectable } from '@angular/core';
import { OrderDetails, Orders } from '../../models/order-detail';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private _http = inject(HttpClient)
  url:string = environment.apiUrl;
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
