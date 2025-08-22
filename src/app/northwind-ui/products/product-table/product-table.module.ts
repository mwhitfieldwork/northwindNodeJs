
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { Routes, RouterModule } from '@angular/router';

import { ProductTableComponent } from './product-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../../utilities/services/product-table/products.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const routes:Routes = [
  {path: '', component: ProductTableComponent},
  //{path: 'details/new', component: ProductDetailComponent, data: {isEdit: false}},
  //{path: 'details/:id', component: ProductDetailComponent, data: {isEdit: true}},
]

@NgModule({
  declarations: [],
  providers:[ProductsService],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    ProductTableComponent,
    RouterModule.forChild(routes),
  ]
})
export class ProductsModule { }