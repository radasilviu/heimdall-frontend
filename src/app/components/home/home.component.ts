import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {RoleService} from '../../services/role-service/role-service';
import {ClientService} from '../../services/clientService/client-service';
import {Subscription} from 'rxjs';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {ParentRealm} from '../../models/Realm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realms;
  currentRealm;

  private subscription: Subscription;

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService,
              private roleService: RoleService,
              private clientService: ClientService,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
      this.realmService.getRealms().subscribe(data => {
        this.realmService.realms$.next(data);
        this.realmService.setRealm(data[0].name);
        this.realmService.realm.subscribe((data:ParentRealm) => this.currentRealm = data.realm);

        this.realmService.realms$.subscribe(data => {
          if (data) {
            this.realms = data;
          }
        });
      });
  }


  changeRealm(realm) {
    this.currentRealm = realm;
    this.realmService.getRealmByName(realm.name).subscribe(data => this.realmService.realm.next(data));
  }


  logout(): void {
    this.subscription = this.adminAuthService.logout().subscribe(() => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
