import { Component, ElementRef, inject, input, OnInit } from '@angular/core';
import { Category } from '../../../utilities/models/category';
import { StockCategoryService } from '../../../utilities/services/category-stock/category-stock.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chart-1',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule, 
    MatTooltipModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule
  ],
  templateUrl: './chart-1.component.html',
  styleUrl: './chart-1.component.scss'
})
export class Chart1Component implements OnInit {

rectWidth = 10;
max:number = 250;
maxHeight = 0;
dimensions!: DOMRect;
outerPadding= 50;
padding = 0;
bandwidth= 0;
bandwidthCoef = 0.4; //bandwidth coefficient, how wide each bar is
left = 80; right=80; bottom =30 ;top=15;
innerHeight!:number;
innerWidth!:number;


categories: Category[] = [];//sales by category
private _categoriesService = inject(StockCategoryService);
categoriesList!:Subscription;
categorySalesList!:Subscription;
categoryName:string = "";


categorySalesForm!: FormGroup;
data:number[] = [125,100, 50, 75, 200,125,80,65];
xlabels:string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
xFullLabels:string[] = [];
ylabels:number[] =[0, 50, 100, this.max].reverse();


constructor(private element:ElementRef, private fb: FormBuilder) {
  //console.log(this.element.nativeElement);
  this.categorySalesForm  = this.fb.group({
    category_name:[''],
    category_year:['']
  });
}

ngOnInit(): void {
  const svg = this.element.nativeElement.getElementsByTagName('svg')[0];
  this.dimensions = svg.getBoundingClientRect();
  this.innerWidth = this.dimensions.width - this.left - this.right;
  this.innerHeight = this.dimensions.height - this.top - this.bottom;

  this.rectWidth = (this.innerWidth -2 * this.outerPadding) / this.data.length;
  this.padding = (1 - this.bandwidthCoef) * this.rectWidth ;
  this.max = 1.3 * Math.max(...this.data); //1.3 = 130%
  this.bandwidth = this.rectWidth * this.bandwidthCoef;

  this.categoriesList = this._categoriesService.getCategories().subscribe(
    (response) => {
      this.categories = response;
    }
  );

  this.categorySalesForm.get('category_name')?.valueChanges.subscribe((value: string) => {
    this.categoryName = value; // Update your variable whenever the value changes
  });

  this.categorySalesForm.get('category_year')?.valueChanges.subscribe((value: string) => {
    this.categorySalesList = this._categoriesService.getSalesByCategory(this.categoryName, value)
    .subscribe((sales) => {
      
      //filter the number into a new data set
      this.data = sales
      .map((x)=> Number(x.totalPurchase) *.025)
      .slice(0,8);
      
      //filter the names as the column data labels
      this.xlabels = sales.map((x) =>
        x.productName.length > 3 
          ? x.productName.slice(0, 3) + '...' 
          : x.productName
      ).slice(0,8);
      
      this.maxHeight = Math.max(...this.data);
      console.log(this.maxHeight);

      this.xFullLabels = sales.map((x) => x.productName) //full labels to reveal full names by tooltip
      
    });
  }); 
}


ngOnDestroy(): void {
  if(this.categoriesList){
    this.categoriesList.unsubscribe();
  }
}

}
