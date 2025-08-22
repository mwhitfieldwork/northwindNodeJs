import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Authentication } from '../../../utilities/models/authentication';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthLoginComponent {
  @Input() signInErrorMessage!: string;

  @Output() submitted = new EventEmitter<Authentication>()


onSubmit(form:Authentication){
  this.submitted.emit(form);
}

}
