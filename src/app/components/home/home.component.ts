import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {Realm} from '../../models/Realm';
import {RoleService} from '../../services/role-service/role-service';
import {ClientService} from '../../services/clientService/client-service';
import {UserService} from '../../services/user-service/user-service';
import {GroupService} from '../../services/group-service/group-service';
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
  realm: Realm;
  realms: Realm[];
  users: User[];
  admin: User;
  private subscription: Subscription;

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService,
              private roleService: RoleService,
              private clientService: ClientService,
              private snackBar: SnackBarService,
              private userService: UserService,
              private groupsService: GroupService) {
  }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('token')).username;
    this.realm = JSON.parse(localStorage.getItem('realm'));

    this.subscription = this.realmService.realm.subscribe(() => {
      if (localStorage.getItem('realm') == null) {
        this.realmService.getAllRealms().subscribe(data => {
          localStorage.setItem('realm', JSON.stringify(data[0]));
          this.realmService.setCurrentRealm(data[0]);
        }, error => this.snackBar.openSnackBar(error.error.message, 4000));
      }

      this.getAllRealms();
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
    this.getAllRealms();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllRealms() {
    this.realmService.getAllRealms().subscribe(data => {
      this.realms = data;
    });
    this.realmService.currentRealm.subscribe(data =>
      this.realm = data);
  }

  changeRealm(realm) {
    this.userService.setUsers(realm);
    this.clientService.setClients(realm);
    this.roleService.setRoles(realm);
    this.groupsService.setGroups(realm);
    this.realmService.setRealm(realm);
    this.realmService.setCurrentRealm(realm);
    localStorage.setItem('realm', JSON.stringify(realm));
  }

  logout(): void {
    this.subscription = this.adminAuthService.logout().subscribe(() => {
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
