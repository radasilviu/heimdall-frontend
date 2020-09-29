import { Component, OnInit } from '@angular/core';
import { RealmServiceService } from 'src/app/services/realm-service/realm-service.service';

@Component({
  selector: 'app-realm-settings',
  templateUrl: './realm-settings.component.html',
  styleUrls: ['./realm-settings.component.css']
})
export class RealmSettingsComponent implements OnInit {

  constructor(private realmService: RealmServiceService) { }

  ngOnInit(): void {

  }

}
