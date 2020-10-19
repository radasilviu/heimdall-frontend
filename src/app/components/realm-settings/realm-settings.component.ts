import {Component, OnInit} from '@angular/core';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {ParentRealm, Realm} from '../../models/Realm';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';

@Component({
  selector: 'app-realm-settings',
  templateUrl: './realm-settings.component.html',
  styleUrls: ['./realm-settings.component.css']
})
export class RealmSettingsComponent implements OnInit {
  realm: Realm;

  constructor(private realmService: RealmService,
              private dialog: MatDialog,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.realmService.realm.subscribe((data: ParentRealm) => {
      this.realm = data.realm;
    });
  }

  deleteRealmByName() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.realmService.deleteRealmByName(this.realm).subscribe(data => {
          this.realmService.getRealms().subscribe(data => {
            this.realmService.setRealms(data);
            this.realmService.setRealm(data[data.length - 1].name);
          });
        });
      }
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
