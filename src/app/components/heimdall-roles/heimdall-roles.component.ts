import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Role} from 'src/app/models/Role';
import {RoleService} from '../../services/role-service/role-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {Router} from "@angular/router";

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

  addRole() {
    this.subSink.add(this.service
      .addRole(this.form.value, this.realm.name)
      .subscribe(() => this.getAllRoles()));
  }

  roleSettings(role) {
    localStorage.setItem("currentRole", JSON.stringify(role))
    this.router.navigate(['home/roles/role-settings']);
  }
}
