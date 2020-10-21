import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminAuthService} from '../../services/admin-auth/admin-auth.service';
import {Router} from '@angular/router';
import {Realm} from '../../models/Realm';
import {Token} from '../../models/token';

@Component({
  selector: 'app-user-profile-login',
  templateUrl: './user-profile-login.component.html',
  styleUrls: ['./user-profile-login.component.css']
})
export class UserProfileLoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  realm: Realm;

  constructor(private authService: AdminAuthService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  login(): void {
    this.authService.profileLogin(this.loginForm.value, this.realm.name)
      .subscribe(
        (token: Token) => {
          localStorage.setItem('token', JSON.stringify(token));
          this.router.navigate([`/user-profile/${this.realm.name}`]);
        }
      );
  }

}
