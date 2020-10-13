import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/Group';
import {GroupService} from '../../services/group-service/group-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {Realm} from '../../models/Realm';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {
  realm: Realm;
  private subscription:Subscription

  constructor(private groupService: GroupService,
              private router: Router,
              private realmService: RealmService,
              public dialog: MatDialog,
              private snackbar: SnackBarService) {
  }


  allGroups: Group[];

  ngOnInit(): void {
   this.subscription = this.groupService.groups.subscribe(() =>{
     this.getAllGroups();
   })
    this.getAllGroups();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  getAllGroups() {
    let realm = localStorage.getItem('realm');

    this.groupService.getAllGroups(JSON.parse(realm).name).subscribe(data => {
      this.allGroups = data;
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });

  }

  deleteGroup(group) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    let realm = localStorage.getItem('realm');


    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
      this.subscription = this.groupService.deleteGroupByName(group, JSON.parse(realm).name).subscribe(data => {

        }, error => {
          this.snackbar.openSnackBar(error.message, 2000);
        });
      }
    });
  }

  groupUsers(group) {
    localStorage.setItem('groupName', group.name);
    this.router.navigate(['/home/group-users']);
  }
}
