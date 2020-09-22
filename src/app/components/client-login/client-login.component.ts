import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ClientLoginService} from '../../services/client-login/client-login.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private clientService: ClientLoginService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [ Validators.required]),
      password: new FormControl('', [ Validators.required])
    });
  }

  get username(): AbstractControl { return this.loginForm.get('username'); }

  get password(): AbstractControl { return this.loginForm.get('password'); }

  onSubmit(): void {

    const clientId = this.route.snapshot.queryParamMap.get('clientId');
    const clientSecret = this.route.snapshot.queryParamMap.get('clientSecret');
    const redirectURL = this.route.snapshot.queryParamMap.get('redirectURL');

    this.clientService
      .login(this.loginForm.value, clientId, clientSecret)
      .subscribe(
        response => {
          document.location.href = `${redirectURL}?code=${response.code}`;
        }
      );
  }


}
