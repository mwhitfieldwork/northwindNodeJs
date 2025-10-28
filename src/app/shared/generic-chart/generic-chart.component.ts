import { Component, Input } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData, 
  ChartOptions, 
  ChartType 
} from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-generic-chart',
  standalone: true,
  imports: [ BaseChartDirective],
  templateUrl: './generic-chart.component.html',
  styleUrl: './generic-chart.component.scss'
})
export class GenericChartComponent {
  @Input() type: ChartType = 'bar';
  @Input() data!: ChartData;
  @Input() options?: ChartOptions;

}
