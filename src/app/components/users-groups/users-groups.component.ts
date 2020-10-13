import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/Group';
import {GroupService} from '../../services/group-service/group-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {SnackBarServiceService} from '../../services/snack-bar/snack-bar-service.service';
import {RealmServiceService} from '../../services/realm-service/realm-service.service';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {
  realm:Realm;

  constructor(private groupService: GroupService,
              private router: Router,
              public dialog: MatDialog,
              private snackbar:SnackBarServiceService,
              private realmService:RealmServiceService) {
              public dialog: MatDialog,
              private snackbar: SnackBarService) {
  }


  allGroups: Group[];

  ngOnInit(): void {
    this.realmService.currentRealm.subscribe((data:Realm) =>{
     this.realm = data
      this.groupService.refresh.subscribe(()=>{
        this.getAllGroups();
      })
      this.getAllGroups();
    })
  }

  getAllGroups(){
    this.groupService.getAllGroups(this.realm.name).subscribe(data =>{
      this.allGroups = data
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });)
  }

  deleteGroup(group) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteGroupByName(group,this.realm.name).subscribe(data => {

        },error => {
          this.snackbar.openSnackBar(error.message,2000)
        });
      }
    });
  }

  groupUsers(group) {
    localStorage.setItem('groupName', group.name);
    this.router.navigate(['/home/group-users']);
  }
}
