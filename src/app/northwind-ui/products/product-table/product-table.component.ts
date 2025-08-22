import { Component, OnInit, ViewChild, Inject, AfterViewInit, inject, OnDestroy, ContentChild, ElementRef, afterRender, afterNextRender } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from './models/products';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog'
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { ProductsService } from '../../../utilities/services/product-table/products.service';
import { ProductTableDetailComponent } from "./product-table-detail/product-table-detail.component";
import { ConfirmDeleteDirective } from '../../../utilities/directives/safe-link/confirmDelete.directive';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  standalone: true,
  providers: [
    ProductsService
  ],
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    ProductTableDetailComponent,
    ConfirmDeleteDirective
]
})
export class ProductTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ContentChild('h1') title!: ElementRef<HTMLElement>;

  isLoading: boolean = false;


  displayedColumns: string[] = [
    'displayName',
    'quantity',
    'price',
    'discontinued',
    'rating',
    'edit',
    'delete'
  ];

  products$!: Observable<Product[]>;
  products: Product[] = [];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  errorMessage:any;
  productID!:number;
  stars:string[] = [];
  index!:number
  starList:any[]  = [];
  productsList!:Subscription;
  isEdit: boolean = false;
  isOpenDialog:boolean = false

  constructor(
    private _productsService: ProductsService, 
    private router:Router,
    private dialog: MatDialog) { 
      /*
      afterRender(() => { //triggers after anything changes, anywhere in the app
        console.log(this.title.nativeElement.textContent);
      });

      afterNextRender(() => { //triggers next after anything changes in the app
        console.log(this.title.nativeElement.textContent);
      });
      */
    }

  ngOnInit(): void {
    this.isLoading = true;
    this.products$ = this.getProducts();
  }

  ngAfterViewInit(): void {
    this.productsList = this.products$.subscribe(data => {
      this.isLoading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterContentInit(): void { //guarantees to have access to the content child
    //this.title.nativeElement.textContent = 'Products'; 
  }

  ngOnDestroy(): void {
    if(this.productsList) this.productsList.unsubscribe();
  }

  getProducts(): Observable<Product[]> {
    return this._productsService.getProducts().pipe(
      map(products => products),
    );
  }
  
  closeDialog($event:boolean){
    this.isOpenDialog = $event;
  }

  AddDialog(){
    this.isOpenDialog = true;
  }

  onSelectProductDetails(productId:string){
    this.router.navigate(['/products', 'details', productId], {
      queryParams: { isEdit: true }
    });
    this.isOpenDialog = true;
  }

  onSelectNewProductDetails(){
    this.router.navigate(['/products', 'details', 'new']);
    this.isOpenDialog = true;
  }

/*  openDialog(): void {
    const dialogRef = this.dialog.open(ProductTableDetailComponent, {
      data: this.products$
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = 100;
    dialogConfig.maxHeight = 500;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed test');
    });
  }


  deleteProduct(product:Product){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
          this.getProducts();
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.products$
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = 500;
    dialogConfig.maxHeight = 500;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed test');
    });
  }
*/

  addRating(products:Product[]):void {
  }

  deleteProduct($event:any){
    console.log($event, 'TESTTTTTT');
  }
}



