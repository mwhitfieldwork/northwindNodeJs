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
avrg = 50;
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
ylabels:number[] =[0, 59, 100, this.max].reverse();


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
  const rawMax = Math.max(...this.data);
  const rawMin = Math.min(...this.data);
  const avg = (rawMax + rawMin) / 2;

  // Define a dynamic padding factor based on spread
  const spread = rawMax - rawMin;
  const spreadRatio = spread / rawMax; // closer to 0 = uniform bars, closer to 1 = wide range

  // Use spreadRatio to adjust padding
  const paddingFactor = 1 + Math.min(0.3, spreadRatio * 0.5);
  this.max = rawMax * paddingFactor;

  //this.max = Math.max(...this.data); 
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
  
        // Convert TotalPurchase to scaled numbers
        const startIndex = 1;
        const endIndex = startIndex + 7;
        this.data = sales.data
          .map((x) => Number(x.TotalPurchase) * 0.025)
          .slice(startIndex, endIndex);
  
        // Truncate ProductName for x-axis labels
        this.xlabels = sales.data
          .map((x) =>
            x.ProductName && x.ProductName.length > 3
              ? x.ProductName.slice(0, 3) + '...'
              : x.ProductName || 'N/A'
          )
          .slice(0, 8);
  
        // Capture full labels for tooltips
        this.xFullLabels = sales.data
          .map((x) => x.ProductName || 'N/A')
          .slice(0, 8);
  
        // Determine max height for chart scaling
        this.maxHeight = Math.max(...this.data);
        this.updateVerticleLabels();
      });
  });
  
}

updateVerticleLabels(){
const max = this.max; // already calculated
const tickCount = 4; // total number of labels (0, mid1, mid2, max)

// Step size between ticks
const step = max / (tickCount - 1); // → divides range into 3 equal parts

// Generate ticks
this.ylabels = Array.from({ length: tickCount }, (_, i) => Math.round(i * step)).reverse();
}

ngOnDestroy(): void {
  if(this.categoriesList){
    this.categoriesList.unsubscribe();
  }
}

}