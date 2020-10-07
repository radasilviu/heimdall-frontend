import { Component, OnInit } from '@angular/core';
import {Group} from '../../../models/Group';
import {GroupServiceService} from '../../../services/group-service/group-service.service';
import {RestApiServiceService} from '../../../services/restapiservice/rest-api-service.service';
import {IUser} from '../../../models/User';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {

  constructor(private restApiService:RestApiServiceService, private groupService:GroupServiceService) { }
  group:Group
  users:IUser[]
  groupUsers:IUser[] = []

  ngOnInit(): void {

    this.restApiService.getAllUsers().subscribe(data =>{
      this.users = data
    })

    this.groupService.getGroup.subscribe(data =>{
      this.group = data;
    })

  }


  addUserToGroup(user){
    this.groupUsers.push(user)
    this.group.users = this.groupUsers;
    this.groupService.updateGroupByName(this.group).subscribe(data =>{
     this.groupService.getAllGroups().subscribe(data =>{
       console.log(data)
     })
    })

  }

}
