import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authGuardian/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username;
  password;
  isNotValid = false;

  constructor(private auth: AuthserviceService, private router: Router) { }

  ngOnInit(): void {}
  
  login() {
    if (this.username === "admin" && this.password === "admin") {
      this.auth.setLogedIn(true);
      this.router.navigate(['home'])
    }
    else {
      this.isNotValid = true;
    }
  }
}
