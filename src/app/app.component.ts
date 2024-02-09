import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Form-validation-task';

  form: any;
  confirmMessage: string =''
  constructor(){

    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern('[6789][0-9]{9}')
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&.])[a-zA-Z0-9!@#$%&.]{8,}$')
      ]),
      confirmPassword: new FormControl('',[
        Validators.required,
        this.confirmPasswordValidator()
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&.])[a-zA-Z0-9!@#$%&.]{8,}$')
      ])
    });
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.root.get('password');
      const confirmPassword = control.value;
      if (password && confirmPassword !== password.value) {
        return { 'passwordMismatch': true };
      }
      return null;
    };
  }

  get firstname() {
    return this.form.get("firstName");
  }
  get lastname(){
    return this.form.get("lastName")
  }
  get email(){
    return this.form.get("email")
  }
  get mobileno(){
    return this.form.get("mobileNo")
  }
  get password(){
    return this.form.get("password")
  }
  get confirmpassword(){
    return this.form.get("confirmPassword")
  }

  onSubmit(){
    this.confirmMessage ='Hey! '+ this.form.value.firstName + ' you have sucessfully submitted the form'
    alert(this.form.value.firstName+" you have sucessfully submitted the form")
    this.form.reset();
  }
  resetData(){
    this.confirmMessage = ''
  }
}
