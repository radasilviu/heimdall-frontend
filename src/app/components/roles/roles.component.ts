import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IRole} from 'src/app/models/Role';
import {IUser} from 'src/app/models/User';
import {RestApiServiceService} from '../../services/restapiservice/rest-api-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  currentUser: IUser;
  userRoles: IRole[];
  allRoles: IRole[];
  user:IUser;

  displayedColumns: string[] = ['Roles'];

  constructor(private service: RestApiServiceService,
              private router: Router,
              private restApi: RestApiServiceService) {
  }

  ngOnInit() {
    this.getUserRoles();
    this.getAllRoles();
  }

  getUserRoles() {
    let user = localStorage.getItem("currentUser")
    this.restApi.getUserByUsername(user).subscribe(data =>{
      this.userRoles = data.roles
      this.user = data;

    })
  }

  getAllRoles() {
    this.restApi.getAllRoles().subscribe(data => {
      this.allRoles = data;
    });
  }

  back() {
    this.router.navigate(['home/users']);
  }

  addRole(role) {
    this.restApi.addUserRole(role, this.user).subscribe(data => {
      this.getUserRoles()
    });
  }

  deleteRole(role) {
    this.restApi.deleteUserRole(this.user, role).subscribe(data => {
      this.getUserRoles()
    });
  }
}
