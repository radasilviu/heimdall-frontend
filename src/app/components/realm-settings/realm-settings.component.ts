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
  subscription: Subscription;

  constructor(private realmService: RealmService,
              private dialog: MatDialog,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.getRealm();
  }

  getRealm() {
    this.realmService.getRealm.subscribe((data: ParentRealm) => {
      this.realm = data.realm;
    });
  }

  deleteRealmByName() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.subscription = dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.realmService.getAllRealms().subscribe(data => {
          localStorage.setItem('realm', JSON.stringify(data[0]));
          this.realmService.setRealm(data[0]);
        }, error => this.snackBar.openSnackBar(error.error.message, 4000));
        this.realmService.deleteRealmByName(this.realm).subscribe();
      }
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
