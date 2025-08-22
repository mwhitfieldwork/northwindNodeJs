import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';
import { Employee } from '../../utilities/models/employee';
import { TerritoriesComponent } from "./territories/territories.component";
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../utilities/services/employee/employee.service';
import { AddNewEmployeeComponent } from "./add-new-employee/add-new-employee.component";
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

const defaultBirthDate = new Date();
defaultBirthDate.setFullYear(defaultBirthDate.getFullYear() - 18);
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    EmployeeComponent, 
    TerritoriesComponent, 
    AddNewEmployeeComponent,
    DatePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
selectedEmployee:Employee = {} as Employee;
isLoading= false;
isSelected = false;
employees:Employee[] = [];
employeesList!:Subscription;
_employeeService = inject(EmployeeService);
 profile_pic!: string;
 isAddSelected = false;

@Output() employeeSelected = new EventEmitter<number>();


ngOnInit(): void {
  this.isLoading = true;
  this.employeesList = this._employeeService.get()
  .subscribe(
    (response) => {
      this.isLoading = false;
      this.employees = response.filter(employee => employee.isDeleted !== true);
    }
  );
}

onSelect(employee:Employee) {
  this.selectedEmployee = employee;
  this.isSelected = true;
  this.profile_pic = `/${employee.firstName?.toLocaleLowerCase()}.png`;
  this.employeeSelected.emit(employee.employeeId);
}

onAddDialog () {
  this.isAddSelected = true;
}

onAddEmployee($event:FormGroup){
  let newEmployee = {
    employeeId: 0, 
    firstName: $event.value.firstName,
    lastName: $event.value.lastName,
    title: $event.value.title,
    titleOfCourtesy: $event.value.titleOfCourtesy,
    birthDate: defaultBirthDate,
    hireDate: new Date(),
    address: "",
    city: $event.value.city,
    region: $event.value.region,
    postalCode: $event.value.postalCode,
    country: $event.value.country,
    homePhone: $event.value.homePhone,
    extension: $event.value.extension,
    notes: $event.value.notes,
    reportsTo: "",
    photo: "",
    isDeleted: false
  };
  //console.log(newEmployee);
  this._employeeService.addEmployee(newEmployee).subscribe({
    next: response => console.log('Employee added successfully:', response),
    error: err => console.error('Error adding employee:', err)
  });
}

onDropEmployee(employeeId: number) {
  this._employeeService.dropEmployee(employeeId);
}

closeDialog(event: boolean) {
  this.isAddSelected = event;
}

}
