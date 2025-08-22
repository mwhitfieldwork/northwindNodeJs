import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
firstName = input<string>()
lastName = input<string>()
photo = input<string>()
title = input<string>()
selected = input.required<boolean>()


name = computed(()=>{
  return `${this.firstName()} ${this.lastName()}`
})  
 
}
