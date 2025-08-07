import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { NavBar } from '../nav-bar/nav-bar';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  constructor(private auth: AuthService) {

  }

  register = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    lastName: new FormControl(null, [Validators.required, Validators.min(5), Validators.maxLength(25)]),
    email: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(100)]),
    password: new FormControl(null, [Validators.required, Validators.min(8)])
  })

flashMessage: string = '';
flashType: 'success' | 'error' = 'success';

sendData(){

if(this.register.valid){
    this.auth.signup(this.register.value).subscribe({
    next:(response)=>{
      console.log(response);
      this.flashType = 'success';
      this.flashMessage = response.body.message || 'Registration successful!';
    },
    error:(err)=>{
      console.log(err);
      this.flashType = 'error';
      this.flashMessage = err.error?.message || 'An unexpected error occurred.';

      this.clearFlashAfterDelay();
    }
  })

}else{
  console.log("enter valid data");

}

}

clearFlashAfterDelay() {
  setTimeout(() => {
    this.flashMessage = '';
  }, 3000);
}
}
