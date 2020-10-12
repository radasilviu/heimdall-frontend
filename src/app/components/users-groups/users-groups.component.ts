import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/Group';
import {GroupServiceService} from '../../services/group-service/group-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {SnackBarServiceService} from '../../services/snack-bar/snack-bar-service.service';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {

  constructor(private groupService: GroupServiceService,
              private router: Router,
              public dialog: MatDialog,
              private snackbar: SnackBarServiceService) {
  }

  Groups: Group[];

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.Groups = data;
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }

  deleteGroup(group) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteGroupByName(group).subscribe(data => {
          this.getAllGroups();
        }, error => {
          this.snackbar.openSnackBar(error.error.message, 3000);
        });
      }
    });
  }

  groupUsers(group) {
    localStorage.setItem('groupName', group.name);
    this.router.navigate(['/home/group-users']);
  }
}
