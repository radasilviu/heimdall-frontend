import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  userRoles = this.userService.user.pipe(map((item: User) => item.roles));
  allRoles = this.roleService.roles;
  realm: Realm;
  subSink = new SubSink();
  displayedColumns: string[] = ['Roles'];
  user: User;

  constructor(private roleService: RoleService,
              private userService: UserService,
              private snackBar: SnackBarService,
              private realmService: RealmService) {
  }

  ngOnInit() {
    this.subSink.add(this.userService.user.subscribe((data: User) => this.user = data));
    this.getRealm();
  }

  getRoles() {
    this.subSink.add(this.roleService.getAllRoles(this.realm.name).subscribe(data => this.roleService.setRoles(data)));
  }

  updateUser() {
    this.subSink.add(this.userService.getUserByUsername(this.user.username, this.realm.name).subscribe(data => this.userService.setUser(data)));
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.subscribe((data: Realm) => {
      this.realm = data;
      this.getRoles();
    }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  addRole(role) {
    this.subSink.add(this.roleService.addUserRole(role, this.user, this.realm.name).subscribe(() => {
      this.updateUser();
    }, error => this.snackBar.openSnackBar(error.error.message, 4000)));
  }


  deleteRole(role) {
    this.subSink.add(this.roleService.deleteUserRole(this.user, role, this.realm.name).subscribe(() => {
      this.updateUser();
    }, error => this.snackBar.openSnackBar(error.error.message, 4000)));
  }
}
