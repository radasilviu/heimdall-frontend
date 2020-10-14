import {Component, OnInit} from '@angular/core';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {Realm} from '../../models/Realm';
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
    this.realm = JSON.parse(localStorage.getItem('realm'));
    this.subscription = this.realmService.realm.subscribe(() => {
      this.getRealm();
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
    this.getRealm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRealm() {
    this.realmService.currentRealm.subscribe((data: Realm) => {
      this.realm = data;
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
    this.subscription.unsubscribe();
  }

  deleteRealmByName() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    this.subscription = dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.realmService.getAllRealms().subscribe(data => {
          localStorage.setItem('realm', JSON.stringify(data[0]));
          this.realmService.setCurrentRealm(data[0]);
        }, error => this.snackBar.openSnackBar(error.error.message, 4000));
        this.realmService.deleteRealmByName(this.realm).subscribe();
      }
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
