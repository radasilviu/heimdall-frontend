import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/Group';
import {GroupService} from '../../services/group-service/group-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {

  constructor(private groupService: GroupService,
              private router: Router,
              public dialog: MatDialog,
              private snackbar: SnackBarService) {
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
