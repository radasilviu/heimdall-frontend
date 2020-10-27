import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {map, tap} from 'rxjs/operators';

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
              private realmService: RealmService) {
  }

  ngOnInit() {
    this.subSink.add(this.userService.user.pipe(tap((data: User) => this.user = data)).subscribe());
    this.getRealm();
  }

  getRoles() {
    this.subSink.add(this.roleService.getAllRoles(this.realm.name).pipe(tap(data => this.roleService.setRoles(data))).subscribe());
  }

  updateUser() {
    this.subSink.add(this.userService.getUserByUsername(this.user.username, this.realm.name).pipe(tap(data => this.userService.setUser(data))).subscribe());
  }

  getRealm() {
    this.subSink.add(this.realmService.realm.pipe(tap((data: Realm) => {
      this.realm = data;
      this.getRoles();
    })).subscribe());
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  addRole(role) {
    this.subSink.add(this.roleService.addUserRole(role, this.user, this.realm.name).pipe(tap(() => this.updateUser())).subscribe());
  }


  deleteRole(role) {
    this.subSink.add(this.roleService.deleteUserRole(this.user, role, this.realm.name).pipe(tap(() => this.updateUser())).subscribe());
  }
}
