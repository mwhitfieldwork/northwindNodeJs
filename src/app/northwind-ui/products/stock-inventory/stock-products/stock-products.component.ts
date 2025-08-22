import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, computed, input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from '../../../../shared/rating/rating.component';

@Component({
  selector: 'stock-products',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    DatePipe, 
    RatingComponent],
  templateUrl: './stock-products.component.html',
  styleUrl: './stock-products.component.scss'
})
export class StockProductsComponent{
  parent = input<FormGroup>(new FormGroup({})); 
  @Output() removed = new EventEmitter<any>();
  stocks = computed(() => (this.parent().get('stock') as FormArray).controls);


  onRemove(group:any, index:number){
    this.removed.emit({group, index})
  }
  

}
