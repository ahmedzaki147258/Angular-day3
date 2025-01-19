import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {confirmPasswordValidator} from '../validations/confirm-password.validator';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ['', Validators.required]
    }, { validators: confirmPasswordValidator });
  }

  get formControls():{ [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  handleSubmitForm(){
    this.submitted=true;
    if (this.registerForm.valid) {
      console.log('Form submitted successfully!', this.registerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
