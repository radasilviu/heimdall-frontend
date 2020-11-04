import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Role} from 'src/app/models/Role';
import {RoleService} from '../../services/role-service/role-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {Router} from '@angular/router';
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";


@Component({
  selector: 'app-heimdall-roles',
  templateUrl: './heimdall-roles.component.html',
  styleUrls: ['./heimdall-roles.component.css']
})
export class HeimdallRolesComponent implements OnInit {
  displayedColumns: string[] = ['Roles'];
  allRoles: Role[];
  realm: Realm;
  subSink = new SubSink();

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private service: RoleService,
              private dialog: MatDialog,
              private router: Router,
              private roleService: RoleService,
              private realmService: RealmService) {
  }

  ngOnInit(): void {
    this.subSink.add(this.realmService
      .currentRealm
      .subscribe((realm: Realm) => {
        this.realm = realm;
        this.getAllRoles();
      }));
  }

  getAllRoles() {
    return this.subSink.add(this.roleService
      .getAllRoles(this.realm.name)
      .subscribe(roles => this.allRoles = roles));
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  updateRole(roleName) {
    localStorage.setItem("currentRoleName", roleName)
    this.router.navigate(['/home/role-settings']);
  }

  addRole() {
    this.subSink.add(this.service
      .addRole(this.form.value, this.realm.name)
      .subscribe(() => this.getAllRoles()));
  }

  deleteRole(role) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed()
      .subscribe(data => {
        if (data == 'true') {
          this.subSink.add(this.service
            .deleteRole(role, this.realm.name)
            .subscribe(() => this.getAllRoles()));
        }
      });
  }
}
