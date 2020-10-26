import {Component, OnInit} from '@angular/core';
import {Role} from 'src/app/models/Role';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  userRoles: Role[];
  allRoles: Role[];
  user: User;
  realm: Realm;
  subSink = new SubSink();
  displayedColumns: string[] = ['Roles'];

  constructor(private roleService: RoleService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private realmService: RealmService) {
  }

  ngOnInit() {
    this.getRealm();
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.subscribe((data: Realm) => {
      this.realm = data;
    }));

    this.subSink.add(this.userService.user.subscribe((data: User) => {
      this.userRoles = data.roles;
      this.user = data;
    }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  addRole(role) {
    this.subSink.add(this.roleService.addUserRole(role, this.user, this.realm.name).subscribe(data => {
      this.userService.setUser(this.user.username, this.realm.name);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000)));
  }


  deleteRole(role) {
    this.subSink.add(this.roleService.deleteUserRole(this.user, role, this.realm.name).subscribe(data => {
      this.userService.setUser(this.user.username, this.realm.name);
    }, error => this.snackBar.openSnackBar(error.error.message, 4000)));
  }
}
