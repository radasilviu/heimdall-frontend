import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/User';
import { RegisterApiService } from 'src/app/services/restapiservice/register-api-service';
import { RestApiServiceService } from 'src/app/services/restapiservice/rest-api-service.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  loginForm: FormGroup;
  isPasswordValid: boolean = true;
  constructor(private service: RegisterApiService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  register() {
    if (this.loginForm.get('password').value == this.loginForm.get('confirmPassword').value) {
      this.isPasswordValid = true;
      let user: IUser = this.loginForm.value;
      this.service.registerUser(user).subscribe(data => {
      }, error => {
      });
    }
    else {
      this.isPasswordValid = false;
    }
  }
}
