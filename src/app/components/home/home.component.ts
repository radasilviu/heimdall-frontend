import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {RoleService} from '../../services/role-service/role-service';
import {ClientService} from '../../services/clientService/client-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {ParentRealm, Realm} from '../../models/Realm';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realms: Realm[];
  currentRealm: Realm;

  subSink = new SubSink();

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService,
              private roleService: RoleService,
              private clientService: ClientService,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.setRealms();
    this.getRealms();
  }

  getRealms() {
    this.subSink.add(this.realmService.realm.subscribe((data: ParentRealm) => this.currentRealm = data.realm));

    this.subSink.add(this.realmService.realms$.subscribe((data: Realm[]) => {
      this.realms = data;
    }));
  }

  setRealms() {
    this.subSink.add(this.realmService.getRealms().subscribe(data => {
      this.realmService.setRealms(data);
      this.realmService.setRealm(data[0].name);
    }))
    ;
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  changeRealm(realm) {
    this.currentRealm = realm;
    this.realmService.setRealm(realm.name);
  }

  logout(): void {
    this.subSink.add(this.adminAuthService.logout().subscribe(() => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000)));
  }
}
