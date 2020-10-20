import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientLoginService} from '../../services/client-login-service/client-login.service';
import {ActivatedRoute} from '@angular/router';
import {from} from 'rxjs';
// @ts-ignore
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {OAuthSocialUser} from 'src/app/models/social_user.model';
import {IdentityProviderService} from '../../services/identity-provider-service/identity-provider-service';
import {UserService} from '../../services/user-service/user-service';


@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {

  loginForm: FormGroup;
  clientId: string;
  clientSecret: string;
  redirectURL: string;
  realm: string;


  constructor(private clientService: ClientLoginService,
              private route: ActivatedRoute,
              private socialAuthService: SocialAuthService,
              private userService: UserService,
              private googleIdent: IdentityProviderService) {
  }

  ngOnInit(): void {


    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.clientId = this.route.snapshot.queryParamMap.get('clientId');
    this.clientSecret = this.route.snapshot.queryParamMap.get('clientSecret');
    this.redirectURL = this.route.snapshot.queryParamMap.get('redirectURL');
    this.realm = this.route.snapshot.queryParamMap.get('realm');
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  onSubmit(): void {

    this.clientService
      .login(this.loginForm.value, this.clientId, this.clientSecret, this.realm)
      .subscribe(
        response => {
          document.location.href = `${this.redirectURL}?code=${response.code}`;
        }
      );
  }

  loginWitSocialProvider(provider: String) {
    let obs;
    switch (provider) {
      case 'GOOGLE':
        obs = from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID));
        break;
      case 'FACEBOOK':
        obs = from(this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID));
        break;
      default:
        obs = from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID));
        break;
    }

    obs.subscribe((socialUser: OAuthSocialUser) => {

        this.clientService.socialLogin(socialUser, this.clientId, this.clientSecret, this.realm)
          .subscribe(
            response => {
              document.location.href = `${this.redirectURL}?code=${response.code}`;
            }
          );
      }
    );
  }
}
