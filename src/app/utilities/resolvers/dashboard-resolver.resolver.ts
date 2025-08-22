import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrderHistoryService } from '../services/orders/order-history.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<any> {
  private _orderHistoryService = inject(OrderHistoryService)
  resolve(): Observable<any> {
    return forkJoin({
      dataFromService1: this._orderHistoryService.get(),
      //dataFromService2: this.childService2.getOtherData()
    });

  }
}

