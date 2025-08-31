import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, tap, throwError} from 'rxjs';
import { Category } from '../../models/category';
import { CategorySale } from '../../models/categorySale';

interface CategoryResponse {
  success: boolean;
  data: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class StockCategoryService {
  private _http = inject(HttpClient)
  
  //url:string = 'https://localhost:7216';
  url:string = 'http://localhost:3002/api/v1';
  
  constructor() { }

  getCategories(): Observable<Category[]> {
    var response = this._http.get<CategoryResponse>(`${this.url}/categories`)
      .pipe(
        map(response => response.data),
        tap(items => {
          //console.log(items, 'Categories')
        }),
        catchError(this.handleError),
      )

    return response
  }
  

  getSalesByCategory(categoryName:string, year:string): Observable<CategorySale> {
    var response = this._http.get<CategorySale>(`${this.url}/categories/${categoryName}/sales/${year}`)
      .pipe(
        tap(items => {
          console.log(items, 'Categories')
        }),
        catchError(this.handleError),
      )

    return response
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(() => error || 'Server error');
  }
}
