import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth/admin-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errormessaje= false;
  constructor(private authService: AdminAuthService, private router: Router) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [ Validators.required]),
      password: new FormControl('', [ Validators.required])
    });
  }

  login(): void {

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService
      .login(username,password)
      .subscribe(
        user => {
          this.router.navigate(['home']);
        },
        error=>{
          this.errormessaje = true;
        }
      );
  }
}
