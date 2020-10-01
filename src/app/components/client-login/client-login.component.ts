import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ClientLoginService } from '../../services/client-login/client-login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { OAuthSocialUser } from 'src/app/models/social_user.model';


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

  constructor(private clientService: ClientLoginService, private route: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.clientId = this.route.snapshot.queryParamMap.get('clientId');
    this.clientSecret = this.route.snapshot.queryParamMap.get('clientSecret');
    this.redirectURL = this.route.snapshot.queryParamMap.get('redirectURL');
  }

  get username(): AbstractControl { return this.loginForm.get('username'); }

  get password(): AbstractControl { return this.loginForm.get('password'); }

  onSubmit(): void {


    this.clientService
      .login(this.loginForm.value, this.clientId, this.clientSecret)
      .subscribe(
        response => {
          document.location.href = `${this.redirectURL}?code=${response.code}`;
        }
      );
  }

  loginWitSocialProvider(provider: String) {
    let obs;
    switch (provider) {
      case "GOOGLE":
        obs = from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))
        break;
      case "FACEBOOK":
        obs = from(this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID))
        break;
      default:
        obs = from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))
        break;
    }


    obs.subscribe((socialUser: OAuthSocialUser) => {

      this.clientService.socialLogin(socialUser, this.clientId, this.clientSecret)
        .subscribe(
          response => {
            document.location.href = `${this.redirectURL}?code=${response.code}`;
          }
        );
    },
      (error: any) => {
        console.log(error);
      }
    );
  }


}
