import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmServiceService} from 'src/app/services/realm-service/realm-service.service';
import {Realm} from '../../models/Realm';
import {Observable, observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realm: Realm;
  realms: Realm[];

  constructor(private router: Router, private realmService: RealmServiceService, private adminAuthService: AdminAuthService) {
  }

  ngOnInit(): void {
    this.getAllRealms();
  }

  getAllRealms() {
    this.realmService.getRealms().subscribe(data => {
      this.realmService.editRealms(data);
      this.realmService.editRealm(data[0]);
    });
    this.realmService.getRealm.subscribe(realm => this.realm = realm)
    this.realmService.getAllRealms.subscribe(realms => {
      this.realms = realms;
    });

  }


  changeRealm(realm) {
    this.realmService.editRealm(realm)
  }

  logout(): void {
    this.adminAuthService.logout().subscribe();
  }


  realmSettings(): void {
    this.router.navigate(['home/realm-settings']);
  }
}
