import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {Realm} from '../../models/Realm';
import {RoleService} from '../../services/role-service/role-service';
import {ClientService} from '../../services/clientService/client-service';
import {User} from '../../models/User';
import {Subscription} from 'rxjs';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realms: Realm[];
  realmTitle: string;

  users: User[];
  admin: User;
  private subscription: Subscription;

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService,
              private roleService: RoleService,
              private clientService: ClientService,
              private snackBar: SnackBarService) {
  }

  ngOnInit(): void {
    this.getAllRealms();
  }

  getAllRealms() {
    this.realmService.getAllRealms().subscribe(data => {
      this.realms = data;

      if (this.realmTitle === undefined) {
        this.realmService.getRealmByName(data[0].name).subscribe(data => {
          this.realmService.setRealm(data);
        });
        this.realmTitle = data[0].displayName;
      }
    });
  }

  changeRealm(realm) {
    this.realmService.getRealmByName(realm.name).subscribe(data => {
      this.realmService.setRealm(data);
      this.realmTitle = data.realm.displayName;
    });
  }


  logout(): void {
    this.subscription = this.adminAuthService.logout().subscribe(() => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
