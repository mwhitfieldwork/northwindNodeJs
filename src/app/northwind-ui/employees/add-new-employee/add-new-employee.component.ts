import { Component, ElementRef, EventEmitter, inject, OnInit, Output, output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-new-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-employee.component.html',
  styleUrl: './add-new-employee.component.scss'
})
export class AddNewEmployeeComponent implements OnInit{
  @Output() close = new EventEmitter<boolean>()
  @Output() submitFrom = new EventEmitter<FormGroup>()
  employeeFrom!: FormGroup;
  private fb = inject(FormBuilder)


  ngOnInit(): void {
    this.employeeFrom = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      title:['', Validators.required],
      homePhone:['', Validators.required],
      photo:['', Validators.required],
      notes:[''],
      city:[''],
      country:[''],
      postalCode:[''],
      region:[''],
      extension:[''],
      titleOfCourtesy:[''],
      birthDate:[''],
      hireDate:['']
    })
    
  }
  closeDialog() {
    this.close.emit(false)
  }

  onSubmit() {
    this.submitFrom.emit(this.employeeFrom);
    console.log('Submit', this.employeeFrom.value)
  }

}
