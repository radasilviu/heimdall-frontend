import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from "../../models/Realm";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realms: Realm[]
  currentRealm: Realm;
  subSink = new SubSink();

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService) {
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  changeRealm(realm) {
    this.realmService
      .setCurrentRealm(realm);
  }

  logout(): void {
    this.subSink
      .add(this.adminAuthService
        .logout()
        .subscribe());
  }

  getAllRealms() {
    this.realmService
      .getAllRealms()
      .subscribe(() => {
        this.realmService
          .realms
          .subscribe(data => this.realms = data)
      })
  }

  ngOnInit() {
    this.getAllRealms()
    this.realmService.setCurrentRealm()
    this.realmService.currentRealm.subscribe((realm: Realm) => this.currentRealm = realm)
  }
}
