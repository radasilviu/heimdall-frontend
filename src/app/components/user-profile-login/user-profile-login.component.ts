import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../services/admin-auth/admin-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RealmServiceService } from '../../services/realm-service/realm-service.service';
import { Realm } from '../../models/Realm';
import { Token } from '../../models/token';

@Component({
  selector: 'app-user-profile-login',
  templateUrl: './user-profile-login.component.html',
  styleUrls: ['./user-profile-login.component.css']
})
export class UserProfileLoginComponent implements OnInit {

  loginForm: FormGroup;
  realm: Realm;

  constructor(private authService: AdminAuthService, private router: Router, private route: ActivatedRoute,
              private realmService: RealmServiceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.route.paramMap.subscribe(params => {
      this.realmService.checkRealmExists(params.get('realm'))
        .subscribe((realm: Realm) => {
          this.realm = realm;
        });
    });
  }

  login(): void {
    this.authService.profileLogin(this.loginForm.value, this.realm.name)
      .subscribe(
        (token: Token) => {
          this.realmService.currentRealm.next(this.realm);
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('currentRealm', JSON.stringify(this.realm));
          this.router.navigate([`/user-profile/${this.realm.name}`]);
        }
      );
  }

}
