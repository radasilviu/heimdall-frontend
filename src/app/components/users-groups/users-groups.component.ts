import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/Group';
import {GroupService} from '../../services/group-service/group-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {RealmService} from '../../services/realm-service/realm-service';
import {ParentRealm, Realm} from '../../models/Realm';
import {Role} from '../../models/Role';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {
  realm: Realm;
  roles: Role[];
  allGroups: Group[];

  constructor(private groupService: GroupService,
              private router: Router,
              private realmService: RealmService,
              private dialog: MatDialog,
              private snackbar: SnackBarService) {
  }

  ngOnInit() {
    this.getRealm();
  }

  getRealm() {
    this.realmService.realm.subscribe((data: ParentRealm) => {
      this.allGroups = data.groups;
      this.realm = data.realm;
      this.roles = data.roles;
    });
  }

  details(group) {
    this.groupService.setGroup(group.name, this.realm.name);
    this.router.navigate(['/home/group-users']);
  }


  deleteGroup(group) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.groupService.deleteGroupByName(group, this.realm.name).subscribe(data => {
          this.realmService.setRealm(this.realm.name);
        }, error => {
          this.snackbar.openSnackBar(error.message, 2000);
        });
      }
    });
  }
}
