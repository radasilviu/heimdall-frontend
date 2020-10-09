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
              private userServcie: UserServiceService,
              private router: Router,) {
  }

  ngOnInit() {
    this.getUserRoles();
    this.getAllRoles();
  }

  getUserRoles() {
    let user = localStorage.getItem('currentUser');
    this.userServcie.getUserByUsername(user).subscribe(data => {
      this.userRoles = data.roles;
      this.user = data;

    });
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(data => {
      this.allRoles = data;
    });
  }

  back() {
    this.router.navigate(['home/users']);
  }

  addRole(role) {
    this.roleService.addUserRole(role, this.user).subscribe(data => {
      this.getUserRoles();
    });
  }

  deleteRole(role) {
    this.roleService.deleteUserRole(this.user, role).subscribe(data => {
      this.getUserRoles();
    });
  }
}
