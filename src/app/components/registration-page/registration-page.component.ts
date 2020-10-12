import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterApiService} from 'src/app/services/register-service/register-api-service';
import {PasswordMatcher} from './PasswordMatcher';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private service: RegisterApiService, private formBuilder: FormBuilder) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    }, {
      validator: PasswordMatcher('password', 'confirmPassword')
    });
  }

  register() {
    this.service.registerUser(this.registerForm.value).subscribe();
  }
}
