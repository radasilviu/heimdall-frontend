import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/Group';
import {GroupServiceService} from '../../services/group-service/group-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {

  constructor(private groupService: GroupServiceService,
              private router: Router,
              public dialog: MatDialog) {
  }

  allGroups: Group[];

  ngOnInit(): void {
    this.getGroups();
  }

  updateView() {
    let realm = localStorage.getItem('realm');
    this.groupService.getAllGroups(realm).subscribe(data => {
      this.allGroups = data;
    });
  }

  getGroups() {
    this.groupService.allGroups.subscribe(data => {
      this.allGroups= data;
    });
  }


  deleteGroup(group) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    let realm = localStorage.getItem("realm")

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteGroupByName(group,realm).subscribe(data => {
          this.updateView();
        });
      }
    });
  }

  groupUsers(group) {
    localStorage.setItem('groupName', group.name);
    this.router.navigate(['/home/group-users']);
  }
}
