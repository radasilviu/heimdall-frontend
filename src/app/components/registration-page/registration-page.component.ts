import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { RestApiServiceService } from 'src/app/services/restapiservice/rest-api-service.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  errormessaje:string;
  loginForm: FormGroup;
  passwordMatch:boolean = true;
  constructor(private servie :RestApiServiceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Username: new FormControl('', [ Validators.required]),
      Password: new FormControl('', [ Validators.required]),
      ConfirmPassword: new FormControl('', [ Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  register(){
    var user = new User();
    if(this.loginForm.get('Password').value == this.loginForm.get('ConfirmPassword').value){
      this.passwordMatch =  true;
      var user = new User(this.loginForm.get("Username").value,this.loginForm.get("Password").value,this.loginForm.get("Email").value)
      this.servie.registerUser(user).subscribe(data =>{
      },error =>{
      });
    }
    else{
      this.passwordMatch =  false;
    }
  }
}
