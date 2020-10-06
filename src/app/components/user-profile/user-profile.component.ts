import { Component, OnInit } from '@angular/core';
import {AdminAuthService} from '../../services/admin-auth/admin-auth.service';
import {RealmServiceService} from '../../services/realm-service/realm-service.service';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  realm: Realm;

  constructor(private adminAuthService: AdminAuthService, private realmService: RealmServiceService) { }

  ngOnInit(): void {
    this.realmService.getRealm.subscribe(data => this.realm =data)
  }

  logout(): void {
    this.adminAuthService.logout().subscribe();
  }
}
