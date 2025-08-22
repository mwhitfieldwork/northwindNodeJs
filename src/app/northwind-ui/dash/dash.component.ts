import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { EmployeesComponent } from "../employees/employees.component";
import { MatCardModule } from '@angular/material/card';
import { StockInventoryComponent } from "../products/stock-inventory/stock-inventory.component";
import { Chart1Component } from "./chart-1/chart-1.component";
import { OrderHistoryComponent } from "../order-history/order-history.component";
import { UserSessionService } from '../../utilities/services/user-session/user-session.service';
import { ActivatedRoute } from '@angular/router';
import { TooltipDirective } from '../../utilities/directives/tooltip/tooltip.directive';
@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [
    EmployeesComponent, 
    MatCardModule, 
    StockInventoryComponent, 
    Chart1Component, 
    OrderHistoryComponent,
    TooltipDirective],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {
  totalOrders:number = 12873;
  averageOrderPrice:number = 5433.32;
  averageTicketPrice:number = 708.12;
  backpackAverage:number = 1234.09;
  private  _userSessionService = inject(UserSessionService);
  
  //the type for this property can only be one of the three 
  //specified union types
  currentStatus!: 'online' | 'offline'| 'unknown' 

  //signal Effects
  currentStatus_signal = signal<'online' | 'offline'| 'unknown'>('online')
  
  data: any;
  //isLoading = true;

  isLoading = signal(true);


  constructor(private route: ActivatedRoute) {
    //read signal value, angular doesn't subscribe to the signal in the calling class
    console.log(this.currentStatus_signal(), '--Signal value, no subscription--');

    //signal with subscription in the calling class 
    //effect can only be ussed in a constructor
    //the subscription gets cleaned up when the component is destroyed
    //we the signal values change the subscription will emit a new value
    effect(() =>{
      console.log(this.currentStatus_signal(), '--Signal value, with subscription--');
    });
  }

  ngOnInit() {
    // Access resolved data
    this.data = this.route.snapshot.data['data'].dataFromService1;

    // Set loading to false once data is ready
    //this.isLoading = false;

    //make isLoading a signal that utilizes update function
    this.isLoading.update((wasLoading) => !wasLoading);

    console.log(this.data); // Logs the resolved data

    //Set the signal
    this.currentStatus_signal.set('online');
  }


}

