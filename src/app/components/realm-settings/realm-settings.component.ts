import {Component, OnInit} from '@angular/core';
import {RealmService} from 'src/app/services/realm-service/realm-service';
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

  constructor(private realmService: RealmService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.realmService.realm.subscribe(()=>{
      this.getRealm();
    })
    this.getRealm();
  }


  getRealm(){
      let realm = localStorage.getItem("realm")
      this.realmService.getRealmByName(JSON.parse(realm).name).subscribe(data =>{
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
