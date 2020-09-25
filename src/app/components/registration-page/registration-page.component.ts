import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  errormessaje:string;
  loginForm: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Username: new FormControl('', [ Validators.required]),
      Password: new FormControl('', [ Validators.required]),
      Email: new FormControl('', [ Validators.required]),
    });
  }

  register(){
  }
}
