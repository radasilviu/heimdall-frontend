import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RestApiServiceService} from 'src/app/services/restapiservice/rest-api-service.service';
import {AdminAuthService} from '../../services/admin-auth/admin-auth.service';
import {IdentityProviderComponent} from '../identity-provider/identity-provider.component';
import {IdentityProviderServiceService} from '../../services/identity-provider-service/identity-provider-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorMessage: boolean = false;

  constructor(private identityProviderService: IdentityProviderServiceService, private authService: AdminAuthService, private router: Router, private route: ActivatedRoute, private service: RestApiServiceService) {
  }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.identityProviderService.getGoogleProvider().subscribe(data =>{
    })
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService
      .login(username, password)
      .subscribe(
        user => {
          this.router.navigate(['home']);
        },
        error => {
          this.errorMessage = true;
        }
      );
  }
}
