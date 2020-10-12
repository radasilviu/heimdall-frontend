import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Role} from 'src/app/models/Role';
import {User} from 'src/app/models/User';
import {RoleServiceService} from '../../services/role-service/role-service.service';
import {UserServiceService} from '../../services/user-service/user-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  currentUser: User;
  userRoles: Role[];
  allRoles: Role[];
  user: User;

  displayedColumns: string[] = ['Roles'];

  constructor(private roleService: RoleServiceService,
              private userService: UserServiceService,
              private router: Router,
              ) {
  }

  ngOnInit() {

    this.updateView();
    this.getAllRoles();
  }


  updateView() {
    let user = localStorage.getItem('currentUser');
    let realm = localStorage.getItem("realm")
    this.userService.getUserByUsername(user,realm).subscribe(data => {
      this.userRoles = data.roles;
      this.user = data;
    });
  }

  getAllRoles() {
    let realm = localStorage.getItem("realm")
    this.roleService.getAllRoles(realm).subscribe(data => {
      this.allRoles = data;
    });
  }

  back() {
    let realm = localStorage.getItem("realm")

    this.router.navigate(['home/users']);
  }

  addRole(role) {
    let realm = localStorage.getItem("realm")
    this.roleService.addUserRole(role, this.user,realm).subscribe(data => {
      this.updateView();
    });
  }

  deleteRole(role) {
    let realm = localStorage.getItem("realm")
    this.roleService.deleteUserRole(this.user, role,realm).subscribe(data => {
      this.updateView();
    });
  }
}
