import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { ReactiveFormsModule, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class LoginComponent {
  constructor(private _AuthService:AuthService, private router:Router){}

  loginForms = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(90)]),
    password: new FormControl(null, [Validators.required])
  })


  flashMessage: string = '';


  sendData(){
    if (this.loginForms.valid){
        console.log(this.loginForms.value);
        this._AuthService.login(this.loginForms.value).subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home']);
            this.flashMessage = 'You have been logged in!';
          },
          error(error) {
            console.log(error);
          },
          complete() {

          }
        })
  }


}
}
