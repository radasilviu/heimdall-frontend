import {Component, OnInit} from '@angular/core';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarService} from '../../services/snack-bar/snack-bar-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-realm-settings',
  templateUrl: './realm-settings.component.html',
  styleUrls: ['./realm-settings.component.css']
})
export class RealmSettingsComponent implements OnInit {
  realm: Realm;
  subSink = new SubSink();

  constructor(private realmService: RealmService,
              private dialog: MatDialog,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.subSink.add(this.realmService.realm.subscribe((data: Realm) => {
      this.realm = data;
    }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  deleteRealmByName() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.realmService.deleteRealmByName(this.realm).subscribe(data => {
          this.subSink.add(this.realmService.getRealms().subscribe(data => {
            this.realmService.setRealms(data);
            this.realmService.setRealm(data[data.length - 1].name);
          }));
        }));
      }
    }, error => this.snackBar.openSnackBar(error.error.message, 4000));
  }
}
