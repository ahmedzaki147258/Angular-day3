import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ['', Validators.required],
      addresses: this.fb.array([])
    }, { validators: confirmPasswordValidator });
  }

  createAddressFormGroup(): FormGroup{
    return this.fb.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  get formControls():{ [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get addresses(): FormArray {
    return this.registerForm.get('addresses') as FormArray;
  }

  addAddress(){
    this.addresses.push(this.createAddressFormGroup());
  }

  removeAddress(idx: number){
    this.addresses.removeAt(idx);
  }

  handleSubmitForm(){
    if (this.registerForm.valid) {
      console.log('Form submitted successfully!', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
