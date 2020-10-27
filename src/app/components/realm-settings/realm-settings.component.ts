import {Component, OnInit} from '@angular/core';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-realm-settings',
  templateUrl: './realm-settings.component.html',
  styleUrls: ['./realm-settings.component.css']
})
export class RealmSettingsComponent implements OnInit {
  realm: Realm;
  subSink = new SubSink();

  constructor(private realmService: RealmService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subSink.add(this.realmService.realm.pipe(tap((data: Realm) => this.realm = data)).subscribe());
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  deleteRealmByName() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.subSink.add(this.realmService.deleteRealmByName(this.realm).pipe(mergeMap(() => {
          return this.realmService.getRealms().pipe(tap(data => {
            this.realmService.setRealms(data);
            this.realmService.setRealm(data[data.length - 1]);
          }));
        })).subscribe());
      }
    });
  }
}
