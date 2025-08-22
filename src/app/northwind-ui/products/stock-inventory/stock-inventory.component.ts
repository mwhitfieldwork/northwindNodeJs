import { Component, ElementRef, HostBinding, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { StockBranchComponent } from "./stock-branch/stock-branch.component";
import {StockSelectorComponent} from "./stock-selector/stock-selector.component"
import { StockProductsComponent } from "./stock-products/stock-products.component";
import { JsonPipe } from '@angular/common';
import {ProductModel} from "../../../utilities/models/product"
import { StockCategoryService } from '../../../utilities/services/category-stock/category-stock.service'
import { Category } from '../../../utilities/models/category';
import { map, Subscription } from 'rxjs';
import { CutomerService } from '../../../utilities/services/customer-info/cutomer.service';
import { DistinctCustomer } from '../../../utilities/models/distinctCustomers.model';
import { CustomerProducts } from '../../../utilities/models/customerProducts.model';

@Component({
  selector: 'app-stock-inventory',
  standalone: true,
  imports: [ReactiveFormsModule, 
    StockBranchComponent, 
    StockSelectorComponent, 
    StockProductsComponent,
    JsonPipe ],
  templateUrl: './stock-inventory.component.html',
  styleUrl: './stock-inventory.component.scss'
})

//Creating a small feature that allows product to be ordered
export class StockInventoryComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);//if you need programmatic access to the host element

  //depreciated way of adding a class of stokc-inventory to the host element
  @HostBinding('class') className = 'stock-inventory'; 
  // triggers when the host element is clicked
  @HostListener('click')  onClick() {
    console.log('Clicked');
  } 

  private _customerService = inject(CutomerService);

  customerList!:Subscription;
  topCustomers: DistinctCustomer[] = [];
  customerProductsList!:Subscription;
  customerProducts: CustomerProducts[] = [];
  
  products: ProductModel[] =[
    {categoryId:2,
      unitPrice: 20,
      productName:"test"
    },
    {categoryId:3,
      unitPrice: 120,
      productName:"test two"
    },
    {categoryId:4,
      unitPrice: 230,
      productName:"test three"
    },
  ]

  categoriesList!:Subscription;

  private _categoryService = inject(StockCategoryService)
  categories: Category[] = [];

  ngOnInit(): void {
    this.categoriesList = this._categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response
      }
    );

    this.getCustomers();
  }

  ngOnDestroy(): void {
    if(this.categoriesList){
      this.categoriesList.unsubscribe();
    }
  }

  form!: FormGroup; // Declare form without initializing immediately

  constructor(private fb: FormBuilder) { // fb is now available
    this.form = this.fb.group({
      store: this.fb.group({
        customer: '',
        code: '',
      }),
      selector: this.fb.group({
        customerID: 0,
        categoryName: '',
        productName: '',
        orderDate: '',
        productID: 0,
        unitPrice: 0,
        quantity: 90,
        rating:0
      }),
      stock: this.fb.array([
      ])
    });
  }

  createStock(stockItem:CustomerProducts) {

    return this.fb.group(
      {
        customerID: this.fb.control(stockItem.customerID),
        categoryName: this.fb.control(stockItem.categoryName),
        productName: this.fb.control(stockItem.productName),
        orderDate: this.fb.control(stockItem.orderDate),
        productID: this.fb.control(stockItem.productID),
        unitPrice: this.fb.control(stockItem.unitPrice),
        quantity: this.fb.control(stockItem.quantity),
        rating: this.getRating()
      });
  }
  addStock(value:any){
    console.log(value, 'Value')
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(value));
  }

  removeStock({group,index}:{group:FormGroup,index:number}){
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
    console.log(group, index) 
  }

getRating():number {
  return ((Math.random() * 100) + 1);
}

  getCustomers(): void {
    this.customerList = this._customerService.getCustomers()
    .pipe(
      map(customers => {
        return customers.map((customer, index) => ({
          ...customer, 
          pkID: index + 1
        }));
      })
    )
    .subscribe(
      (response) => {
        this.topCustomers = response
        //console.log(this.topCustomers, "TOP CUSTOMERS");
      });
  }

  getProductsByCustomer(id:string): void {
    this.customerProductsList = this._customerService.getProductsByCustomer(id)
    .pipe(
      map(customers => {
        return customers.map((customer, index) => ({
          ...customer, 
          pkID: index + 1
        }));
      })
    )
    .subscribe(
      (response) => {
        this.customerProducts = response
        //console.log(this.customerProducts, "Products for customer");
      });
  }

  onSubmit(){
    console.log('Submit', this.form.value)
    console.log('Host Element', this.el);
  }

  /* --Longhand way
  form = new FormGroup({
    store: new FormGroup({ //passed down to the stock branch component
      branch: new FormControl('B182'),
      code: new FormControl('1234'),
    }),
    selector: new FormGroup({ //passed to the selector component
      product_id: new FormControl(),
      quantity: new FormControl(10)
    }),
    stock: new FormArray([
      this.createStock({product_id:1, quantity:60}),
      this.createStock({product_id:3, quantity:30})
    ])//collection of form controls and form groups to be passed to stock-products
  })
 
  createStock(stock:any){
    return new FormGroup({ //passed to the selector component
      product_id: new FormControl(stock.product_id || ''),
      quantity: new FormControl(stock.quantity || 10)
    })
  }
  --*/
}
