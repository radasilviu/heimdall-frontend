import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {SubSink} from 'subsink';
import {Realm} from '../../models/Realm';
import {mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realms: Realm[];
  currentRealm: Realm;

  subSink = new SubSink();

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService) {
  }

  ngOnInit() {
    this.setRealms();
    this.getRealms();
  }

  getRealms() {
    this.subSink.add(this.realmService.realm.pipe(tap((data: Realm) => this.currentRealm = data)).subscribe());
    this.subSink.add(this.realmService.realms.pipe(tap((data: Realm[]) => this.realms = data)).subscribe());
  }


  setRealms() {
    this.realmService.getRealms().pipe(mergeMap(
      realms => {
        this.realmService.setRealms(realms);
        return this.realmService.getRealmByName(realms[0].name).pipe(tap(data => this.realmService.setRealm(data)));
      }
    )).subscribe();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  changeRealm(realm) {
    this.currentRealm = realm;
    this.realmService.setRealm(realm);
  }

  logout(): void {
    this.subSink.add(this.adminAuthService.logout().subscribe());
  }
}
