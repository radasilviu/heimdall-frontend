import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminAuthService} from '../../services/admin-auth/admin-auth.service';
import {IdentityProviderService} from '../../services/identity-provider-service/identity-provider-service';
import {RealmService} from '../../services/realm-service/realm-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorMessage: boolean = false;
  realm;

  constructor(private identityProviderService: IdentityProviderService,
              private authService: AdminAuthService,
              private router: Router,
              private realmService: RealmService) {
  }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.realm = 'master0';

    this.identityProviderService.getGoogleProvider().subscribe(data => {
    });
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService
      .login(username, password, this.realm)

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
