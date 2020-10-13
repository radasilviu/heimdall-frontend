import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Role} from 'src/app/models/Role';
import {User} from 'src/app/models/User';
import {RoleService} from '../../services/role-service/role-service';
import {UserService} from '../../services/user-service/user-service';
import {GroupService} from '../../services/group-service/group-service';

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


  constructor(private roleService: RoleService,
              private userService: UserService,
              private router: Router,
              private groupService:GroupService) {
  }

  ngOnInit() {
    this.roleService.roles.subscribe(() =>{
      this.getAllRoles()
      this.getUserRoles()
    })
    this.getUserRoles()
    this.getAllRoles()
  }




  getAllRoles() {
    let realm = localStorage.getItem("realm")

    this.roleService.getAllRoles(JSON.parse(realm).name).subscribe(data => {
      this.allRoles = data;
    });
  }

  getUserRoles(){
    let realm = localStorage.getItem("realm")
    let userName = localStorage.getItem("currentUser")
    this.userService.getUserByUsername(userName,JSON.parse(realm).name).subscribe((data:User) =>{
      this.user = data
      this.userRoles = data.roles
    })

  }

  addRole(role) {
    let realm = localStorage.getItem("realm")
    this.roleService.addUserRole(role, this.user,JSON.parse(realm).name).subscribe(data => {
    });
  }

  deleteRole(role) {
    let realm = localStorage.getItem("realm")
    this.roleService.deleteUserRole(this.user, role,JSON.parse(realm).name).subscribe(data => {
    });
  }
}
