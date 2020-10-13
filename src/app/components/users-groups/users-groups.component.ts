import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/Group';
import {GroupServiceService} from '../../services/group-service/group-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
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

  constructor(private groupService: GroupServiceService,
              private router: Router,
              public dialog: MatDialog,
              private snackbar:SnackBarServiceService,
              private realmService:RealmServiceService) {
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
    })
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
