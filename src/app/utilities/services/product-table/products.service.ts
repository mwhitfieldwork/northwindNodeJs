import { Inject, inject, Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../../northwind-ui/products/product-table/models/products';
import { catchError, tap, map, take, filter } from 'rxjs/operators'
import { ProductModel } from '../../../utilities/models/product';
import { Category } from '../../../northwind-ui/products/product-table/models/category';
import { ProductResponse, ProductListResponse } from '../../../utilities/models/productResponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private _http = inject(HttpClient);

  url:string = 'http://localhost:3002/api/v1';
  errorMessage:any;

  getProducts(): Observable<Product[]> {
    return this._http.get<ProductListResponse>(`${this.url}/products`)
      .pipe(
        map(response =>
          response.data
            .filter(product => product.isDeleted !== 1) 
            .slice(0, 10)
        ),
        tap(items => {
          // console.log(this.url)
        }),
        catchError(this.handleError),
      );
  }
  

  getProduct(productId: string): Observable<Product> {
    //let url = `${this.url}/Product/${productId}`;
    let url = `${this.url}/products/${productId}`;
    var response = this._http.get<ProductResponse>(url)
      .pipe(
        tap(item => {
          //console.log(item)
        }),
        map(response => response.data),
        catchError(this.handleError),
      )

    return response
  }


  createProduct(product: ProductModel): Observable<Product> {
    let url = `${this.url}/products`;
    let newProduct = JSON.stringify(product)
    var response = this._http.post<Product>(url, newProduct, httpOptions);
    console.log(url);
    return response;
  }

  updateProduct(product: ProductModel, productId:string): Observable<Product> {
    let url = `${this.url}/products/${productId}`;
    let newProduct = JSON.stringify(product)
    console.log(url);
    var response = this._http.put<Product>(url, newProduct, httpOptions);
    return response;
  }


  deleteProduct(id:number): void {
    let url = `${this.url}/products/${id}`;
    var response = this._http.delete(url)
    .subscribe({
      next: data => {
          console.log( 'Delete successful');
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    });

  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(() => error || 'Server error');
  }
}
