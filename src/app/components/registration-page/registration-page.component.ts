import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterApiService} from 'src/app/services/register-service/register-api-service';
import {PasswordMatcher} from './PasswordMatcher';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registerForm: FormGroup;
  homeUrl: string;
  subSink = new SubSink();

  constructor(private service: RegisterApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.homeUrl = localStorage.getItem('url');

    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    }, {
      validator: PasswordMatcher('password', 'confirmPassword')
    });
  }
  ngOnDestroy(){
    this.subSink.unsubscribe();
  }

  register() {
    this.subSink.add(
      this.service.registerUser(this.registerForm.value).subscribe());
  }

}
