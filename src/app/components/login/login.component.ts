import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiServiceService } from 'src/app/services/restapiservice/rest-api-service.service';
import { AdminAuthService } from '../../services/admin-auth/admin-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errormessaje:boolean = false;
  constructor(private authService: AdminAuthService, private router: Router, private route: ActivatedRoute, private service: RestApiServiceService) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    const clientCode = this.route.snapshot.queryParamMap.get('clientCode');
    const clientSecret = this.route.snapshot.queryParamMap.get('clientSecret');

    this.authService
      .login(username, password, clientCode, clientSecret)
      .subscribe(
        user => {
          this.router.navigate(['home']);
        },
        error => {
          this.errormessaje = true;
        }
      );
  }
}
