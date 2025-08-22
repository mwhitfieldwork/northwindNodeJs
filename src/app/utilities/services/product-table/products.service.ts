import { Inject, inject, Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../../northwind-ui/products/product-table/models/products';
import { catchError, tap, map, take } from 'rxjs/operators'
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

  url:string = 'https://localhost:7216';
  njsUrl:string = 'http://localhost:3000';
  errorMessage:any;

  getProducts(): Observable<Product[]> {
    //var response = this._http.get<Product[]>(`${this.url}/Product`)
    var response = this._http.get<ProductListResponse>(`${this.njsUrl}/api/v1/products`)
      .pipe(
        map(products => products.data.slice(0, 10)), 
        tap(items => {
          //console.log(this.url)
        }),
        catchError(this.handleError),
      )

    return response
  }

  getCategories(): Observable<Category[]> {
    var response = this._http.get<Category[]>(`${this.url}/Category/`)
      .pipe(
        tap(items => {
          //this.nwDataChanged.next(items);
          console.log(this.url)
        }),
        catchError(this.handleError),
      )

    return response
  }

  getProduct(productId: string): Observable<Product> {
    //let url = `${this.url}/Product/${productId}`;
    let url = `${this.njsUrl}/api/v1/products/${productId}`;
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
    let url = `${this.url}/Product/AddProduct`;
    let newProduct = JSON.stringify(product)
    var response = this._http.post<Product>(url, newProduct, httpOptions);
    console.log(url);
    return response;
  }

  updateProduct(product: ProductModel, productId:string): Observable<Product> {
    let url = `${this.url}/Product/${productId}`;
    let newProduct = JSON.stringify(product)
    console.log(url);
    var response = this._http.put<Product>(url, newProduct, httpOptions);
    return response;
  }


  deleteProduct(id:number): void {
    let url = `${this.url}/Product/${id}`;
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
