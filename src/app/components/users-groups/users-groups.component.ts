import { Component, OnInit } from '@angular/core';
import {IUser} from '../../models/User';
import {Group} from '../../models/Group';
import {GroupServiceService} from '../../services/group-service/group-service.service';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {

  constructor(private groupService:GroupServiceService) { }

  Groups:Group[];

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(){
    this.groupService.getAllGroups().subscribe(data =>
      this.Groups = data)
  }

  deleteGroup(group){
    this.groupService.deleteGroupByName(group).subscribe(data =>{
      this.getAllGroups();
    })
  }
}
