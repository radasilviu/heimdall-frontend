import {Component, OnInit} from '@angular/core';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';

@Component({
  selector: 'app-realm-settings',
  templateUrl: './realm-settings.component.html',
  styleUrls: ['./realm-settings.component.css']
})
export class RealmSettingsComponent implements OnInit {
  subSink = new SubSink();
  realm: Realm;

  constructor(private realmService: RealmService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.realmService
      .realm
      .subscribe((realm: Realm) => this.realm = realm);
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe();
  }

  deleteRealmByName() {
    const dialogRef = this.dialog
      .open(DeleteDialogComponent);

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data == 'true') {
          this.subSink.add(this.realmService
            .deleteRealmByName(this.realm)
            .subscribe(() => {
              this.realmService
                .getRealms()
                .subscribe(realms => {
                  this.realmService
                    .setRealms(realms);
                  this.realmService
                    .setCurrentRealm(realms[realms.length - 1]);
                });
            }));
        }
      });
  }
}
