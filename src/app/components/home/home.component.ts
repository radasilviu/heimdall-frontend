import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminAuthService} from 'src/app/services/admin-auth/admin-auth.service';
import {RealmService} from 'src/app/services/realm-service/realm-service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  panelOpenState = false;
  realms = this.realmService.realms$;
  currentRealm = this.realmService.realm$;

  subSink = new SubSink();

  constructor(private router: Router,
              private realmService: RealmService,
              private adminAuthService: AdminAuthService) {
    this.realmService.getRealms().subscribe(realms => {
      this.realmService.setRealm(realms[0]);
      this.realmService.setRealms(realms);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  changeRealm(realm) {
    this.realmService.setRealm(realm);
  }

  logout(): void {
    this.subSink.add(this.adminAuthService.logout().subscribe());
  }
}
