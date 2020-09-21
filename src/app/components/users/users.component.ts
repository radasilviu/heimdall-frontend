import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { error } from 'protractor';
import { RestApiServiceService } from '../../services/restapiservice/rest-api-service.service';
import { RoleServiceService } from '../../services/roleservice/role-service.service';

export interface User {
  username: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  isRoles = false;
  displayedColumns = ['username', 'role'];
  username = "";
  password = "";

  dataSource;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private service: RestApiServiceService, private roleService: RoleServiceService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    let clients = this.service.getAllUsers();
    clients.subscribe(data => {
      this.dataSource = data as User[]
      for (let i in this.dataSource) {
        this.dataSource[i].Id = i;
      }
    })
    this.table.renderRows();
  }

  viewRoles(username, id) {
    this.roleService.setusername(username)
    this.roleService.setId(id);
    this.isRoles = true;
  }

  goBack() {
    this.isRoles = false;
  }

  addUser() {
    this.service.addUser(this.username).subscribe(data => {
      this.getAllUsers();
    },error=>{
      console.log(error)
      this.service.openSnackBar(error.error)
    });
  }
  deleteUser(username){
    this.service.deleteUser(username).subscribe(data =>{
      this.getAllUsers();
    });
  }
}
