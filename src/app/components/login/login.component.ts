import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AdminAuthService} from '../../services/admin-auth/admin-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username;
  password;
  errormessaje= false;
  constructor(private authService: AdminAuthService, private router: Router) { }

  ngOnInit(): void {}

  login(): void {
    this.authService
      .login(this.username, this.password)
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
