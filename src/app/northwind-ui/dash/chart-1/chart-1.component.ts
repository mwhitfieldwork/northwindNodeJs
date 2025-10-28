import { Component, ElementRef, inject, input, OnInit } from '@angular/core';
import { Category } from '../../../utilities/models/category';
import { StockCategoryService } from '../../../utilities/services/category-stock/category-stock.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GenericChartComponent } from "../../../shared/generic-chart/generic-chart.component";
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    GenericChartComponent
],
  templateUrl: './chart-1.component.html',
  styleUrl: './chart-1.component.scss'
})
export class Chart1Component implements OnInit {
categories: Category[] = [];//sales by category
private _categoriesService = inject(StockCategoryService);
categoriesList!:Subscription;
categorySalesList!:Subscription;
categoryName:string = "";
categorySalesForm!: FormGroup;
data:number[] = [125,100, 50, 75, 200,125,80,65, 120, 100,300,120];
xlabels:string[] = [  
  "Ridge Backpack",
  "Ember Journal",
  "Utility Pouch",
  "Travel Flask",
  "Canvas Tote",
  "Sketch Roll",
  "Field Binder",
  "Cargo Wrap",
  "Tool Satchel",
  "Lantern Case",
  "Supply Crate",
  "Organizer Kit"
];
  
barChartData!: ChartData<'bar'>;
barChartOptions!: ChartOptions<'bar'>;

constructor(private element:ElementRef, private fb: FormBuilder) {
  //console.log(this.element.nativeElement);
  this.categorySalesForm  = this.fb.group({
    category_name:[''],
    category_year:['']
  });
}

ngOnInit(): void {
  //const svg = this.element.nativeElement.getElementsByTagName('svg')[0];
 // this.dimensions = svg.getBoundingClientRect();
  //this.innerWidth = this.dimensions.width - this.left - this.right;
  //this.innerHeight = this.dimensions.height - this.top - this.bottom;

  //this.rectWidth = (this.innerWidth -2 * this.outerPadding) / this.data.length;
  //this.padding = (1 - this.bandwidthCoef) * this.rectWidth ;
  //const rawMax = Math.max(...this.data);
 // const rawMin = Math.min(...this.data);
 // const avg = (rawMax + rawMin) / 2;

  // Define a dynamic padding factor based on spread
  //const spread = rawMax - rawMin;
  //const spreadRatio = spread / rawMax; // closer to 0 = uniform bars, closer to 1 = wide range

  // Use spreadRatio to adjust padding
  //const paddingFactor = 1 + Math.min(0.3, spreadRatio * 0.5);
  //this.max = rawMax * paddingFactor;

  //this.max = Math.max(...this.data); 
  //this.bandwidth = this.rectWidth * this.bandwidthCoef;

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
        this.data = sales.data
          .filter(x => !!x.ProductName && x.ProductName.trim().length > 0)
          .map((x) => Number(x.TotalPurchase) * 0.009)
          .slice(0, 12);
          
          this.xlabels = Array.from(
            new Set(
              sales.data
                .filter(x => !!x.ProductName && x.ProductName.trim().length > 0)
                .map(x => x.ProductName.trim().toLowerCase())
            )
          ).slice(0, 12);
          

        // Update the bar chart
          this.displayData("dropdown");
      });
  });
  this.displayData("ngInit");
}
displayData(scope:string){
  console.log(scope);

  this.barChartData = {
    labels: this.xlabels,
    datasets: [
      {
        label: 'categories',
        data: this.data,
        backgroundColor: [
          "#FF6F61", "#FFB347", "#FFD700", "#FF8C00", "#FF4500",
          "#DC143C", "#E9967A", "#CD5C5C", "#FFA07A", "#F4A460", "#D2691E"
        ]
      }
    ]
  };

  this.barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    }
  };

}


ngOnDestroy(): void {
  if(this.categoriesList){
    this.categoriesList.unsubscribe();
  }
}

}