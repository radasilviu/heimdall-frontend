import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  errormessaje:string;
  loginForm: FormGroup;
  passwordMatch:boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Username: new FormControl('', [ Validators.required]),
      Password: new FormControl('', [ Validators.required]),
      ConfirmPassword: new FormControl('', [ Validators.required]),
      Email: new FormControl('', [ Validators.required]),
    });
  }

  register(){
    var user = new User();
    if(this.loginForm.get('Password').value == this.loginForm.get('ConfirmPassword').value){
      this.passwordMatch =  true;
    }
    else{
      this.passwordMatch =  false;
    }
  }
}
