import {Component, OnInit} from '@angular/core';
import {RealmServiceService} from 'src/app/services/realm-service/realm-service.service';
import {Realm} from '../../models/Realm';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-realm-settings',
  templateUrl: './realm-settings.component.html',
  styleUrls: ['./realm-settings.component.css']
})
export class RealmSettingsComponent implements OnInit {

  realm: Realm;

  constructor(private realmService: RealmServiceService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getRealm()
  }


  getRealm(){
    this.realmService.realm.subscribe((data:Realm) =>{
      this.realm = data
    })
  }

  deleteRealmByName() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'true') {
        this.realmService.deleteRealmByName(this.realm).subscribe();

      }
    });
  }
}
