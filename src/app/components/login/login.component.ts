import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminAuthService} from '../../services/admin-auth/admin-auth.service';
import {IdentityProviderService} from '../../services/identity-provider-service/identity-provider-service';
import {SubSink} from 'subsink';
import {RealmService} from "../../services/realm-service/realm-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorMessage: boolean = false;
  realm: string;
  loginForm: FormGroup;
  subSink = new SubSink();

  constructor(private identityProviderService: IdentityProviderService,
              private authService: AdminAuthService,
              private realmService: RealmService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.realm = 'master0';

    this.subSink.add(this.identityProviderService.getGoogleProvider().subscribe(data => {
    }));
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  login(): void {

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.subSink.add(this.authService
      .login(username, password, this.realm)

      .subscribe(
        user => {
          this.realmService.getAllRealms().subscribe(data => {
            this.realmService.setCurrentRealm(data[0])
            this.router.navigate(['home']);
          });
        },
        error => {
          this.errorMessage = true;
        }
      ));
  }
}
