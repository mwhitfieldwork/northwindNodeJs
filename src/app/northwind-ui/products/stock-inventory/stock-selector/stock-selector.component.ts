import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../../utilities/models/category';
import { CustomerProducts } from '../../../../utilities/models/customerProducts.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'stock-selector',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './stock-selector.component.html',
  styleUrl: './stock-selector.component.scss'
})
export class StockSelectorComponent implements OnInit {
  parent = input<FormGroup>(new FormGroup({})); 
  customerProducts = input<CustomerProducts[]>([]);
  @Output() added = new EventEmitter<any>();

  ngOnInit(): void {
    const storeGroup = this.parent().get('selector') as FormGroup;

    storeGroup.get('customerID')?.valueChanges.subscribe(value => {
      console.log('Selected customer ID:', value)
      this.parent().get('selector')?.patchValue({
        cusomterId: value.customerID,
        categoryName: value.categoryName,
        productName: value.productName,
        orderDate: value.orderDate,
        productID: value.productID,
        unitPrice: value.unitPrice,
        quantity:value.quantity,
        rating: value.rating
      });
    });
  }

  onAdd(){
    console.log(this.parent().get('selector')?.value, 'Selector')
    this.added.emit(this.parent().get('selector')?.value);

    this.parent().get('selector')?.reset({
      customerID: 0,
      categoryName: '',
      productName: '',
      orderDate: '',
      productID: 0,
      unitPrice: 0,
      quantity: 10,
      rating:0
    });
    
    this.parent().get('selector')?.setValue({
      customerID: 0,
      categoryName: '',
      productName: '',
      orderDate: '',
      productID: 0,
      unitPrice: 0,
      quantity: 12,
      rating:0
    });

    this.parent().get('selector')?.patchValue({
      customerID: 0,
      categoryName: '',
      productName: '',
      orderDate: '',
      productID: 0,
      unitPrice: 0,
      quantity: 9,
      rating:0
    });
  }
}
